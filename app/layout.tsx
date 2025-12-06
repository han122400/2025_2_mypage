'use client'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { createContext, useContext, useState, useEffect } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Snow mode context
const SnowModeContext = createContext<{
  snowMode: boolean
  toggleSnowMode: () => void
}>({
  snowMode: false,
  toggleSnowMode: () => {},
})

export const useSnowMode = () => useContext(SnowModeContext)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [snowMode, setSnowMode] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('snowMode')
    if (saved) {
      setSnowMode(JSON.parse(saved))
    }
  }, [])

  const toggleSnowMode = () => {
    const newMode = !snowMode
    setSnowMode(newMode)
    localStorage.setItem('snowMode', JSON.stringify(newMode))
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SnowModeContext.Provider value={{ snowMode, toggleSnowMode }}>
          {children}
        </SnowModeContext.Provider>
      </body>
    </html>
  )
}
