'use client'

import { useConversation } from '@elevenlabs/react'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Mic, MicOff, Radio } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useSnowMode } from '@/app/layout'
import FloatingVoiceWave from '@/components/FloatingVoiceWave'
import ChatMessage from '@/components/ChatMessage'

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVEN_AGENT_ID as string

// 채팅 메시지 타입
type ChatItem = {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export default function VoiceCallPage() {
  const { snowMode } = useSnowMode()
  const [isConnected, setIsConnected] = useState(false)
  const [status, setStatus] = useState('대기 중')
  const [messages, setMessages] = useState<ChatItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // ElevenLabs 메시지를 ChatItem으로 변환
  const normalizeMessage = (msg: any): ChatItem | null => {
    const role: 'user' | 'assistant' =
      msg.type === 'user' || msg.role === 'user' ? 'user' : 'assistant'

    let text = ''

    // content 배열 안의 input_text / output_text 추출
    if (Array.isArray(msg.content)) {
      text = msg.content
        .filter(
          (c: any) => c && (c.type === 'output_text' || c.type === 'input_text')
        )
        .map((c: any) => c.text)
        .join(' ')
    }

    // fallback들
    if (!text) {
      text =
        msg.message ||
        msg.text ||
        (typeof msg.content === 'string' ? msg.content : '') ||
        ''
    }

    if (!text || !String(text).trim()) return null

    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      role,
      text: String(text).trim(),
    }
  }

  const conversation = useConversation({
    agentId: AGENT_ID,
    onConnect: () => {
      setIsConnected(true)
      setStatus('통화 연결됨 (리스닝 중)')
    },
    onDisconnect: () => {
      setIsConnected(false)
      setStatus('통화 종료')
    },
    onError: (err) => {
      console.error(err)
      setError('대화 중 오류가 발생했습니다.')
    },
    onMessage: (msg) => {
      console.log('Message received:', msg)

      const chat = normalizeMessage(msg)
      if (!chat) return // 텍스트 없는 이벤트는 무시

      setMessages((prev) => [...prev, chat])
    },
    onStatusChange: (statusUpdate) => {
      if (typeof statusUpdate === 'string') {
        setStatus(statusUpdate)
      } else if (statusUpdate && 'status' in statusUpdate) {
        // @ts-ignore
        setStatus(statusUpdate.status as string)
      }
    },
  })

  const requestMic = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (err) {
      setError('마이크 권한을 허용해야 통화할 수 있습니다.')
      throw err
    }
  }

  const handleStart = async () => {
    setError(null)

    if (!AGENT_ID) {
      setError('NEXT_PUBLIC_ELEVEN_AGENT_ID 환경 변수가 설정되지 않았습니다.')
      return
    }

    try {
      await requestMic()
      setStatus('연결 중…')
      await conversation.startSession({
        agentId: AGENT_ID,
        connectionType: 'webrtc', // 안 되면 'websocket'으로 테스트
      })
    } catch (err) {
      console.error(err)
      setError('통화 시작에 실패했습니다.')
    }
  }

  const handleEnd = async () => {
    try {
      await conversation.endSession()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    return () => {
      conversation.endSession().catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex min-h-screen bg-[#313338] relative">
      <Sidebar currentPage="live_ai" />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col ml-72 relative">
        <Header icon={Radio} title="AI voice chat" />

        {/* 플로팅 음성 파형 */}
        <FloatingVoiceWave active={isConnected} />

        {/* 채팅 영역 */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {snowMode && (
            <div className="absolute inset-0 pointer-events-none z-0">
              <Image
                src="/background/snow.gif"
                alt="Snow Background"
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
          )}

          {/* 메시지 영역 - 상단 여백(파형) + 하단 여백(컨트롤) */}
          <div className="flex-1 overflow-y-auto p-4 relative z-10 pt-36 pb-28">
            {messages.length === 0 ? (
              <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Mic className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg font-semibold mb-2">
                    음성 채널에 오신 것을 환영합니다
                  </p>
                  <p className="text-sm">
                    아래 통화 버튼을 눌러 AI와 대화를 시작하세요
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-w-4xl mx-auto pb-4">
                {messages.map((m) => (
                  <ChatMessage key={m.id} role={m.role} text={m.text} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* 하단 컨트롤 바 - 고정 */}
          <div className="fixed bottom-0 left-72 right-0 bg-[#2b2d31] border-t border-[#1e1f22] p-3 z-40">
            <div className="max-w-4xl mx-auto">
              {/* 에러 메시지 */}
              {error && (
                <div className="mb-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    {error}
                  </p>
                </div>
              )}

              {/* 중앙 정렬된 컨트롤 */}
              <div className="flex items-center justify-between gap-6">
                {/* 왼쪽 공간(정렬용) */}
                <div className="flex-1" />

                {/* 통화 버튼 */}
                <button
                  onClick={isConnected ? handleEnd : handleStart}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    isConnected
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-[#5865f2] hover:bg-[#4752c4] text-white'
                  }`}
                >
                  {isConnected ? (
                    <>
                      <MicOff className="w-5 h-5" />
                      음성 채팅 종료
                    </>
                  ) : (
                    <>
                      <Mic className="w-5 h-5" />
                      음성 채팅 시작
                    </>
                  )}
                </button>

                {/* 상태 표시 */}
                <div className="flex items-center gap-3 flex-1 justify-end">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                    }`}
                  />
                  <span className="text-gray-400 text-sm font-mono">
                    {status}
                  </span>
                  {isConnected && (
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <Mic className="w-4 h-4" />
                      <span>연결됨</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
