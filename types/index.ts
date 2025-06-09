import type React from "react"
// Global TypeScript type definitions

export interface MousePosition {
  x: number
  y: number
}

export interface WalletState {
  connected: boolean
  connecting: boolean
  address?: string
  chainId?: number
  balance?: string
}

export interface CryptoData {
  name: string
  symbol: string
  price: number
  change: number
  icon: React.ReactNode
  color: string
  marketCap?: number
  volume24h?: number
}

export interface NFTItem {
  id: number
  name: string
  creator: string
  price: string
  lastSale: string
  image: string
  category: string
  description?: string
  attributes?: NFTAttribute[]
  tokenId?: string
  contractAddress?: string
}

export interface NFTAttribute {
  trait_type: string
  value: string | number
  rarity?: number
}

export interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
  link?: string
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface AnimationConfig {
  duration: number
  delay: number
  ease?: string
}

export interface ThreeJSConfig {
  particleCount: number
  particleSize: number
  particleOpacity: number
  particleColor: number
  lightIntensity: number
  cameraDistance: number
}

// Event handler types
export type MouseEventHandler = (event: React.MouseEvent) => void
export type ClickEventHandler = () => void
export type HoverEventHandler = (id: number | null) => void

// Component prop types
export interface ButtonProps {
  children: React.ReactNode
  onClick?: ClickEventHandler
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
}

export interface MotionDivProps {
  children: React.ReactNode
  className?: string
  initial?: object
  animate?: object
  whileInView?: object
  transition?: object
  viewport?: object
}

// API response types
export interface CryptoPriceResponse {
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

export interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: NFTAttribute[]
  external_url?: string
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}

export interface WalletError extends AppError {
  code: "WALLET_NOT_FOUND" | "CONNECTION_REJECTED" | "NETWORK_ERROR"
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
