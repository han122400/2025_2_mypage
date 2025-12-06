'use client'

import { LucideIcon, Snowflake } from 'lucide-react'
import { useSnowMode } from '@/app/layout'

interface HeaderProps {
  icon: LucideIcon
  title: string
}

export default function Header({ icon: Icon, title }: HeaderProps) {
  const { snowMode, toggleSnowMode } = useSnowMode()

  return (
    <header className="h-15 border-b border-[#1e1f22] flex items-center justify-between px-4 bg-[#313338] sticky top-0 z-50">
      <div className="flex items-center">
        <Icon className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-white font-semibold">{title}</span>
      </div>
      <button
        onClick={toggleSnowMode}
        className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
          snowMode
            ? 'bg-cyan-500 text-white hover:bg-cyan-600'
            : 'bg-[#2b2d31] text-gray-400 hover:bg-[#383a40] hover:text-white'
        }`}
        title={snowMode ? '스노우 모드 끄기' : '스노우 모드 켜기'}
      >
        <Snowflake className="w-5 h-5" />
        <span className="text-sm font-semibold">Snow Mode</span>
      </button>
    </header>
  )
}
