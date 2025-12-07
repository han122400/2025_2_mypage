interface ChatMessageProps {
  message: string
  index: number
}

export default function ChatMessage({ message, index }: ChatMessageProps) {
  try {
    const parsed = JSON.parse(message)
    const isUser = parsed.type === 'user' || parsed.role === 'user'
    const text = parsed.message || parsed.content || parsed.text || message

    return (
      <div
        className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            isUser ? 'bg-[#5865f2]' : 'bg-[#eb459e]'
          }`}
        >
          <span className="text-white font-bold text-sm">
            {isUser ? 'U' : 'AI'}
          </span>
        </div>
        <div
          className={`flex-1 min-w-0 max-w-[70%] ${isUser ? 'text-right' : ''}`}
        >
          <div
            className={`flex items-center gap-2 mb-1 ${
              isUser ? 'flex-row-reverse' : ''
            }`}
          >
            <span className="text-white font-semibold text-sm">
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            <span className="text-gray-500 text-xs">
              {new Date().toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div
            className={`inline-block p-3 rounded-lg ${
              isUser ? 'bg-[#5865f2] text-white' : 'bg-[#2b2d31] text-gray-300'
            }`}
          >
            <p className="text-sm wrap-break-word text-left">{text}</p>
          </div>
        </div>
      </div>
    )
  } catch {
    return (
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">?</span>
        </div>
        <div className="flex-1 min-w-0 max-w-[70%]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-semibold text-sm">System</span>
            <span className="text-gray-500 text-xs">
              {new Date().toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <div className="inline-block p-3 rounded-lg bg-[#2b2d31]">
            <p className="text-gray-300 text-xs wrap-break-word font-mono">
              {message}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
