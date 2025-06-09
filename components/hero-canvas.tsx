"use client"

import { useEffect, useRef, useCallback } from "react"
import * as THREE from "three"

// TypeScript interfaces for Three.js components
interface ThreeJSScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  particlesMesh: THREE.Points
  purpleLight: THREE.PointLight
  pinkLight: THREE.PointLight
}

interface ParticleSystemConfig {
  count: number
  size: number
  opacity: number
  color: number
  spread: number
}

export default function HeroCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<ThreeJSScene | null>(null)
  const animationIdRef = useRef<number | null>(null)

  const particleConfig: ParticleSystemConfig = {
    count: 2000,
    size: 0.02,
    opacity: 0.8,
    color: 0xffffff,
    spread: 15,
  }

  const createParticleSystem = useCallback((config: ParticleSystemConfig): THREE.Points => {
    const particlesGeometry = new THREE.BufferGeometry()
    const posArray = new Float32Array(config.count * 3)

    for (let i = 0; i < config.count * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * config.spread
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: config.size,
      color: config.color,
      transparent: true,
      opacity: config.opacity,
      blending: THREE.AdditiveBlending,
    })

    return new THREE.Points(particlesGeometry, particlesMaterial)
  }, [])

  const createLights = useCallback((): { purpleLight: THREE.PointLight; pinkLight: THREE.PointLight } => {
    const purpleLight = new THREE.PointLight(0x9c27b0, 10, 20)
    purpleLight.position.set(-5, 3, 5)

    const pinkLight = new THREE.PointLight(0xe91e63, 10, 20)
    pinkLight.position.set(5, -3, 5)

    return { purpleLight, pinkLight }
  }, [])

  const handleResize = useCallback((): void => {
    if (!sceneRef.current) return

    const { camera, renderer } = sceneRef.current
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, [])

  const animate = useCallback((): void => {
    if (!sceneRef.current) return

    const { scene, camera, renderer, particlesMesh } = sceneRef.current

    particlesMesh.rotation.y += 0.0005
    particlesMesh.rotation.x += 0.0002

    renderer.render(scene, camera)
    animationIdRef.current = requestAnimationFrame(animate)
  }, [])

  const initializeScene = useCallback((): void => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    canvasRef.current.appendChild(renderer.domElement)

    // Create particles
    const particlesMesh = createParticleSystem(particleConfig)
    scene.add(particlesMesh)

    // Add lights
    const { purpleLight, pinkLight } = createLights()
    scene.add(purpleLight)
    scene.add(pinkLight)

    // Store scene reference
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particlesMesh,
      purpleLight,
      pinkLight,
    }

    // Start animation
    animate()

    // Add resize listener
    window.addEventListener("resize", handleResize)
  }, [createParticleSystem, createLights, animate, handleResize, particleConfig])

  const cleanup = useCallback((): void => {
    // Cancel animation
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      animationIdRef.current = null
    }

    // Remove resize listener
    window.removeEventListener("resize", handleResize)

    // Cleanup Three.js resources
    if (sceneRef.current) {
      const { renderer, particlesMesh } = sceneRef.current

      // Remove renderer from DOM
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement)
      }

      // Dispose geometries and materials
      if (particlesMesh.geometry) {
        particlesMesh.geometry.dispose()
      }
      if (particlesMesh.material && "dispose" in particlesMesh.material) {
        ;(particlesMesh.material as THREE.Material).dispose()
      }

      // Dispose renderer
      renderer.dispose()

      sceneRef.current = null
    }
  }, [handleResize])

  useEffect(() => {
    initializeScene()
    return cleanup
  }, [initializeScene, cleanup])

  return <div ref={canvasRef} className="absolute inset-0" />
}
