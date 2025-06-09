"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

// TypeScript interfaces
interface NFTItem {
  id: number
  name: string
  creator: string
  price: string
  lastSale: string
  image: string
  category: string
}

interface AnimationConfig {
  duration: number
  delay: number
}

const NFT_DATA: NFTItem[] = [
  {
    id: 1,
    name: "Cosmic Dreamers #4281",
    creator: "0xArtist",
    price: "2.4 ETH",
    lastSale: "1.2 ETH",
    image: "/public/barbora-dostalova-D8z4iOkV3a4-unsplash.jpg",
    category: "Art",
  },
  {
    id: 2,
    name: "Digital Soul #142",
    creator: "MetaCreator",
    price: "1.8 ETH",
    lastSale: "0.9 ETH",
    image: "/public/barbora-dostalova-yYuW_7uTOzY-unsplash.jpg",
    category: "Digital",
  },
  {
    id: 3,
    name: "Neon Genesis #78",
    creator: "CryptoVisionary",
    price: "3.2 ETH",
    lastSale: "2.1 ETH",
    image: "/public/guerrillabuzz-jIsiOJ4gxIY-unsplash.jpg",
    category: "Neon",
  },
  {
    id: 4,
    name: "Abstract Realms #2109",
    creator: "BlockchainArtist",
    price: "1.5 ETH",
    lastSale: "0.8 ETH",
    image: "/public/hazel-z-eWfSIP60OgA-unsplash.jpg",
    category: "Abstract",
  },
]

export default function NftShowcase(): JSX.Element {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const handleMouseEnter = useCallback((id: number): void => {
    setHoveredId(id)
  }, [])

  const handleMouseLeave = useCallback((): void => {
    setHoveredId(null)
  }, [])

  const getAnimationConfig = useCallback(
    (index: number): AnimationConfig => ({
      duration: 0.5,
      delay: index * 0.1,
    }),
    [],
  )

  const handleViewDetails = useCallback((nft: NFTItem): void => {
    console.log(`Viewing details for ${nft.name}`)
    // Add navigation logic here
  }, [])

  const handleViewAllCollections = useCallback((): void => {
    console.log("Viewing all collections")
    // Add navigation logic here
  }, [])

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {NFT_DATA.map((nft: NFTItem, i: number) => {
          const animationConfig = getAnimationConfig(i)

          return (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: animationConfig.duration, delay: animationConfig.delay }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(nft.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 p-4 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4`}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-white/20 bg-black/50 backdrop-blur-md text-white hover:bg-white/20"
                      onClick={() => handleViewDetails(nft)}
                    >
                      View Details
                    </Button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-md text-xs text-white/80">
                    {nft.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-lg mb-1 text-white group-hover:text-purple-300 transition-colors">
                    {nft.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-2">by {nft.creator}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="font-medium text-purple-400">{nft.price}</span>
                      <span className="text-xs text-white/50">Current Price</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-white/50">Last Sale: {nft.lastSale}</span>
                      <span className="text-xs text-green-400">{hoveredId === nft.id ? "Click to view" : ""}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <Button
          variant="outline"
          className="border-white/20 bg-white/5 backdrop-blur-lg hover:bg-white/10 text-white group"
          onClick={handleViewAllCollections}
        >
          View All Collections
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  )
}
