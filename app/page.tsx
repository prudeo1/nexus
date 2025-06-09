"use client"

import type React from "react"

import { useRef, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Wallet, Sparkles, Layers, ArrowRight, ChevronDown, Gem } from "lucide-react"
import CryptoTicker from "@/components/crypto-ticker"
import HeroCanvas from "@/components/hero-canvas"
import NftShowcase from "@/components/nft-showcase"
import CursorEffect from "@/components/cursor-effect"

// TypeScript interfaces
interface WalletState {
  connected: boolean
  connecting: boolean
  address?: string
}

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
}

interface FooterColumn {
  title: string
  links: string[]
}

export default function Home(): JSX.Element {
  const [walletState, setWalletState] = useState<WalletState>({
    connected: false,
    connecting: false,
  })
  const heroRef = useRef<HTMLDivElement>(null)

  const connectWallet = useCallback((): void => {
    setWalletState((prev) => ({ ...prev, connecting: true }))

    // Simulate wallet connection
    setTimeout(() => {
      setWalletState({
        connected: true,
        connecting: false,
        address: "0x" + Math.random().toString(16).substr(2, 8),
      })
    }, 1000)
  }, [])

  const features: FeatureItem[] = [
    {
      icon: <Wallet className="h-8 w-8 text-purple-400" />,
      title: "Secure Wallet Integration",
      description: "Connect your preferred wallet with enterprise-grade security protocols.",
    },
    {
      icon: <Layers className="h-8 w-8 text-pink-400" />,
      title: "Multi-chain Support",
      description: "Seamlessly interact with multiple blockchains from a single interface.",
    },
    {
      icon: <Gem className="h-8 w-8 text-blue-400" />,
      title: "NFT Marketplace",
      description: "Discover, collect, and trade unique digital assets with zero gas fees.",
    },
  ]

  const footerColumns: FooterColumn[] = [
    {
      title: "Product",
      links: ["Features", "Roadmap", "Pricing", "FAQ"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Tutorials", "Blog", "Support"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Contact", "Press"],
    },
  ]

  const navigationItems: string[] = ["Explore", "Features", "Roadmap", "Team"]
  const socialLinks: string[] = ["twitter", "discord", "github", "telegram"]

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white overflow-hidden">
      {/* Cursor effect */}
      <CursorEffect />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="text-purple-400" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              NEXUS3
            </span>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item: string, i: number) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="text-white/80 hover:text-white transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Button
              onClick={connectWallet}
              disabled={walletState.connecting}
              variant="outline"
              className={`
                group relative overflow-hidden border border-purple-500/50
                ${walletState.connected ? "bg-green-500/20 text-green-300" : "bg-purple-500/20 text-purple-300"}
                ${walletState.connecting ? "opacity-70 cursor-not-allowed" : ""}
              `}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 group-hover:opacity-100 opacity-0 transition-opacity" />
              <Wallet className="mr-2 h-4 w-4" />
              {walletState.connecting
                ? "Connecting..."
                : walletState.connected
                  ? `Connected ${walletState.address?.slice(0, 6)}...`
                  : "Connect Wallet"}
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center" ref={heroRef}>
        <div className="absolute inset-0 z-0">
          <HeroCanvas />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-2 flex items-center"
            >
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium border border-white/20">
                Next Generation Web3
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-pink-400"
            >
              Redefining Digital Ownership
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-white/70 mb-8 max-w-xl"
            >
              Explore the future of decentralized applications with our cutting-edge Web3 platform. Seamless, secure,
              and revolutionary.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 rounded-xl group">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                className="border-white/20 bg-white/5 backdrop-blur-lg hover:bg-white/10 text-white px-8 py-6 rounded-xl"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="text-white/50 animate-bounce" />
        </motion.div>
      </section>

      {/* Crypto Ticker */}
      <div className="relative z-10 border-y border-white/10 backdrop-blur-md bg-black/20">
        <CryptoTicker />
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Revolutionary Features
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with intuitive design to deliver a seamless Web3 experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature: FeatureItem, i: number) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group"
              >
                <div className="mb-4 p-3 rounded-xl bg-white/5 w-fit">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NFT Showcase */}
      <section id="explore" className="py-24 relative z-10 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Featured Collections
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore curated digital assets from top creators around the world.
            </p>
          </motion.div>

          <NftShowcase />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-white/10 p-12">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/3"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Ready to join the Web3 revolution?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-white/70"
                >
                  Get early access to our platform and be part of the next generation of the internet.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Button className="bg-white text-purple-900 hover:bg-white/90 px-8 py-6 rounded-xl text-lg font-medium">
                  Join Waitlist
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-purple-400" />
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  NEXUS3
                </span>
              </div>
              <p className="text-white/50 mb-4">Redefining digital ownership in the Web3 era.</p>
              <div className="flex gap-4">
                {socialLinks.map((social: string) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={`Follow us on ${social}`}
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-white/70" />
                  </a>
                ))}
              </div>
            </div>

            {footerColumns.map((column: FooterColumn) => (
              <div key={column.title}>
                <h3 className="font-medium text-lg mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link: string) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm">© 2025 NEXUS3. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#terms" className="text-white/50 text-sm hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#privacy" className="text-white/50 text-sm hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
