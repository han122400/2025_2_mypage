'use client'

import VoiceWave from './VoiceWave'

interface FloatingVoiceWaveProps {
  active: boolean
}

export default function FloatingVoiceWave({ active }: FloatingVoiceWaveProps) {
  return (
    <div
      className="fixed z-30 pointer-events-none"
      style={{
        top: '60px', // Header 높이
        left: '288px', // Sidebar 너비 (72 * 4 = 288px)
        right: '0',
      }}
    >
      {/* 그라데이션 배경 - 위에서 아래로 자연스럽게 페이드 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          height: '100px',
          background:
            'linear-gradient(to bottom, rgba(49, 51, 56, 0.6) 0%, rgba(49, 51, 56, 0.4) 25%, rgba(49, 51, 56, 0.2) 50%, rgba(49, 51, 56, 0.1) 75%, transparent 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      />

      {/* 음성 파형 */}
      <div className="relative flex items-center justify-center pt-4 pointer-events-none">
        <VoiceWave active={active} className="w-52 h-24" />
      </div>
    </div>
  )
}
