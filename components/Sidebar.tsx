import Link from 'next/link'
import {
  Hash,
  Users,
  Rocket,
  Smile,
  Database,
  ShoppingCart,
  Radio,
} from 'lucide-react'

interface SidebarProps {
  currentPage:
    | 'home'
    | 'portfolio'
    | 'team'
    | 'projects_team'
    | 'projects_my'
    | 'live_ai'
  crudLink?: 'https://crud-three-lake.vercel.app'
  shoppingMallLink?: 'https://shopping-mall-brown.vercel.app'
}

export default function Sidebar({
  currentPage,
  crudLink = 'https://crud-three-lake.vercel.app',
  shoppingMallLink = 'https://shopping-mall-brown.vercel.app',
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-[#2b2d31] flex flex-col">
      <div className="p-4 border-b border-[#1e1f22]">
        <h1 className="text-white text-xl font-bold">Portfolio</h1>
      </div>
      <nav className="flex-1 p-4">
        <Link
          href="/"
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors mb-2 ${
            currentPage === 'home'
              ? 'bg-[#404249] text-white'
              : 'text-gray-300 hover:bg-[#404249] hover:text-white'
          }`}
        >
          <Hash className="w-5 h-5" />
          <span>홈</span>
        </Link>
        <Link
          href="/portfolio"
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors mb-2 ${
            currentPage === 'portfolio'
              ? 'bg-[#404249] text-white'
              : 'text-gray-300 hover:bg-[#404249] hover:text-white'
          }`}
        >
          <Smile className="w-5 h-5" />
          <span>내 포트폴리오</span>
        </Link>
        <Link
          href="/team"
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors mb-2 ${
            currentPage === 'team'
              ? 'bg-[#404249] text-white'
              : 'text-gray-300 hover:bg-[#404249] hover:text-white'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>팀 소개</span>
        </Link>
        <Link
          href="/projects_team"
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors mb-2 ${
            currentPage === 'projects_team'
              ? 'bg-[#404249] text-white'
              : 'text-gray-300 hover:bg-[#404249] hover:text-white'
          }`}
        >
          <Rocket className="w-5 h-5" />
          <span>팀 프로젝트</span>
        </Link>

        {/* 구분선 */}
        <div className="my-4 border-t border-[#404249]"></div>

        {/* Live AI */}
        <Link
          href="/live_ai"
          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors mb-2 ${
            currentPage === 'live_ai'
              ? 'bg-[#404249] text-white'
              : 'text-gray-300 hover:bg-[#404249] hover:text-white'
          }`}
        >
          <Radio className="w-5 h-5" />
          <span>Live AI</span>
        </Link>

        {/* 구분선 */}
        <div className="my-4 border-t border-[#404249]"></div>

        {/* 외부 링크 */}
        <a
          href={crudLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors mb-2 text-gray-300 hover:bg-[#404249] hover:text-white"
        >
          <Database className="w-5 h-5" />
          <span>CRUD</span>
        </a>
        <a
          href={shoppingMallLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-gray-300 hover:bg-[#404249] hover:text-white"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>SHOPPING MALL</span>
        </a>
      </nav>
      <div className="p-4 border-t border-[#1e1f22] bg-[#232428]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold">
            P
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-semibold">박한빈</div>
            <div className="text-gray-400 text-xs">개발자</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
