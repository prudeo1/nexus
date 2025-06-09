"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { Bitcoin, CircleDot, ArrowUp, ArrowDown } from "lucide-react"

// TypeScript interfaces
interface CryptoData {
  name: string
  symbol: string
  price: number
  change: number
  icon: React.ReactNode
  color: string
}

interface PriceUpdateConfig {
  maxChange: number
  updateInterval: number
}

const INITIAL_CRYPTO_DATA: CryptoData[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 68423.12,
    change: 2.4,
    icon: <Bitcoin className="h-5 w-5 text-orange-500" />,
    color: "text-orange-500",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3521.87,
    change: -1.2,
    icon: <CircleDot className="h-5 w-5 text-purple-500" />,
    color: "text-purple-500",
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: 142.56,
    change: 5.7,
    icon: <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />,
    color: "text-purple-500",
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    change: 0.8,
    icon: <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />,
    color: "text-blue-500",
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 7.23,
    change: -0.5,
    icon: <div className="h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-red-500" />,
    color: "text-pink-500",
  },
]

const PRICE_UPDATE_CONFIG: PriceUpdateConfig = {
  maxChange: 0.01, // ±1% max change
  updateInterval: 5000, // 5 seconds
}

export default function CryptoTicker(): JSX.Element {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(INITIAL_CRYPTO_DATA)

  const updatePrices = useCallback((): void => {
    setCryptoData((prevData: CryptoData[]) =>
      prevData.map((crypto: CryptoData) => {
        const priceChange = (Math.random() - 0.5) * PRICE_UPDATE_CONFIG.maxChange
        const changeVariation = (Math.random() - 0.5) * 0.4

        return {
          ...crypto,
          price: crypto.price * (1 + priceChange),
          change: crypto.change + changeVariation,
        }
      }),
    )
  }, [])

  const formatPrice = useCallback((price: number): string => {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }, [])

  const formatChange = useCallback((change: number): string => {
    return `${change >= 0 ? "+" : ""}${Math.abs(change).toFixed(1)}%`
  }, [])

  const getChangeIcon = useCallback((change: number): React.ReactNode => {
    return change >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />
  }, [])

  const getChangeColor = useCallback((change: number): string => {
    return change >= 0 ? "text-green-400" : "text-red-400"
  }, [])

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(updatePrices, PRICE_UPDATE_CONFIG.updateInterval)
    return () => clearInterval(interval)
  }, [updatePrices])

  return (
    <div className="overflow-hidden py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...cryptoData, ...cryptoData].map((crypto: CryptoData, index: number) => (
          <div key={`${crypto.symbol}-${index}`} className="flex items-center mx-8">
            <div className="mr-2">{crypto.icon}</div>
            <span className="font-medium mr-1">{crypto.symbol}</span>
            <span className="text-white/70 mr-2">${formatPrice(crypto.price)}</span>
            <span className={`flex items-center ${getChangeColor(crypto.change)}`}>
              {getChangeIcon(crypto.change)}
              {formatChange(crypto.change)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
