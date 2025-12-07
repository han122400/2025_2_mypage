'use client'

import dynamic from 'next/dynamic'
import { useRef, useEffect } from 'react'
import type { CSSProperties } from 'react'

// JSON 직접 import (Next는 기본적으로 JSON import 지원)
import animationData from '@/public/lottie/voice-wave.json'

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false, // 서버에서는 렌더 안 함
})

type Props = {
  active?: boolean
  className?: string
}

export default function VoiceWave({ active = false, className }: Props) {
  const lottieRef = useRef<any>(null)
  const style: CSSProperties = { width: '100%', height: '100%' }

  useEffect(() => {
    if (!lottieRef.current) return

    if (active) {
      lottieRef.current.play()
    } else {
      lottieRef.current.stop()
    }
  }, [active])

  return (
    <div className={className ?? 'w-40 h-16'}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        autoplay={active}
        style={style}
      />
    </div>
  )
}
