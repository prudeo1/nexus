"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"

// TypeScript interfaces
interface MousePosition {
  x: number
  y: number
}

interface CursorConfig {
  size: number
  followerSize: number
  stiffness: number
  damping: number
  mass: number
}

interface SpringConfig {
  type: "spring"
  mass: number
  stiffness: number
  damping: number
}

const CURSOR_CONFIG: CursorConfig = {
  size: 32, // 8 * 4 (w-8 h-8)
  followerSize: 160, // 40 * 4 (w-40 h-40)
  stiffness: 800,
  damping: 30,
  mass: 0.1,
}

const FOLLOWER_CONFIG: SpringConfig = {
  type: "spring",
  mass: 0.5,
  stiffness: 200,
  damping: 50,
}

export default function CursorEffect(): JSX.Element {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  const handleMouseMove = useCallback(
    (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    },
    [isVisible],
  )

  const handleMouseLeave = useCallback((): void => {
    setIsVisible(false)
  }, [])

  const checkIfDesktop = useCallback((): boolean => {
    return window.innerWidth >= 768
  }, [])

  const handleResize = useCallback((): void => {
    setIsDesktop(checkIfDesktop())
  }, [checkIfDesktop])

  useEffect(() => {
    // Check if desktop on mount
    setIsDesktop(checkIfDesktop())

    // Only add listeners on desktop
    if (!checkIfDesktop()) return

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", handleResize)
    }
  }, [handleMouseMove, handleMouseLeave, handleResize, checkIfDesktop])

  // Don't render on mobile
  if (!isDesktop) return <></>

  const cursorSpringConfig: SpringConfig = {
    type: "spring",
    mass: CURSOR_CONFIG.mass,
    stiffness: CURSOR_CONFIG.stiffness,
    damping: CURSOR_CONFIG.damping,
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mix-blend-screen pointer-events-none z-50"
        animate={{
          x: mousePosition.x - CURSOR_CONFIG.size / 2,
          y: mousePosition.y - CURSOR_CONFIG.size / 2,
          opacity: isVisible ? 1 : 0,
          scale: 1,
        }}
        transition={cursorSpringConfig}
        style={{
          willChange: "transform, opacity",
        }}
      />

      {/* Cursor follower */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-40 h-40 rounded-full bg-purple-500/20 filter blur-xl pointer-events-none z-40"
        animate={{
          x: mousePosition.x - CURSOR_CONFIG.followerSize / 2,
          y: mousePosition.y - CURSOR_CONFIG.followerSize / 2,
          opacity: isVisible ? 0.3 : 0,
        }}
        transition={FOLLOWER_CONFIG}
        style={{
          willChange: "transform, opacity",
        }}
      />
    </>
  )
}
