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
        top: '60px', // 그대로
        left: '288px', // 그대로
        right: '0', // 그대로
      }}
    >
      {/* 블러 + 그라데이션 (위 진하게, 아래로 갈수록 사라짐) */}
      <div
        className="pointer-events-none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '220px', // 이 높이 안에서만 효과 나옴 (원하는 값으로 조절)
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          // 살짝 어둡게 깔리는 컬러 그라데이션
          background:
            'linear-gradient(to bottom,' +
            'rgba(49, 51, 56, 0.6) 0%,' +
            'rgba(49, 51, 56, 0.4) 40%,' +
            'rgba(49, 51, 56, 0.0) 100%)',
          // 👇 이게 포인트: 블러 자체가 아래로 갈수록 사라지게 마스크
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* 음성 파형 */}
      <div className="relative flex items-center justify-center pt-4 pointer-events-none">
        <VoiceWave active={active} className="w-52 h-24" />
      </div>
    </div>
  )
}
