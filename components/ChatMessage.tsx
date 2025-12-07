interface ChatMessageProps {
  role: 'user' | 'assistant'
  text: string
}

export default function ChatMessage({ role, text }: ChatMessageProps) {
  const isUser = role === 'user'

  const time = new Date().toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* 아바타 */}
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-[#5865f2] to-[#00b5ff]'
            : 'bg-[#eb459e]'
        }`}
      >
        <span className="text-white font-bold text-xs">
          {isUser ? 'U' : 'AI'}
        </span>
      </div>

      {/* 내용 영역 */}
      <div
        className={`flex flex-col min-w-0 max-w-[70%] ${
          isUser ? 'items-end text-right' : 'items-start text-left'
        }`}
      >
        {/* 이름 */}
        <span className="text-white font-semibold text-sm mb-1">
          {isUser ? 'You' : 'AI Assistant'}
        </span>

        {/* 말풍선 */}
        <div
          className={`inline-block px-3 py-2 rounded-2xl text-sm leading-relaxed break-words shadow-sm ${
            isUser
              ? 'bg-gradient-to-br from-[#5865f2] to-[#00b5ff] text-white'
              : 'bg-[#2b2d31] text-gray-200 border border-white/5'
          }`}
        >
          {text}
        </div>

        {/* 말풍선 아래 시간 */}
        <span className="mt-1 text-xs text-gray-500">{time}</span>
      </div>
    </div>
  )
}
