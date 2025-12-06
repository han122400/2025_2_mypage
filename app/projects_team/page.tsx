'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Rocket, ExternalLink } from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useSnowMode } from '@/app/layout'

export default function Projects() {
  const { snowMode } = useSnowMode()
  return (
    <div className="flex min-h-screen bg-[#313338] relative">
      <Sidebar currentPage="projects_team" />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col ml-72 relative">
        <Header icon={Rocket} title="팀 프로젝트" />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto p-6 relative">
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
          <div className="max-w-4xl mx-auto relative z-10">
            {/* 프로젝트 소개 */}
            <div className="mb-8">
              <h2 className="text-white text-3xl font-bold mb-4">
                보안뉴스 프로젝트
              </h2>
              <p className="text-gray-300 text-lg">
                우리 팀이 함께 개발한 실시간 보안 뉴스 큐레이션 플랫폼입니다.
              </p>
            </div>

            {/* 프로젝트 카드 */}
            <div className="bg-[#2b2d31] rounded-lg p-6 hover:bg-[#383a40] transition-colors mb-8">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white text-xl font-bold">보안뉴스</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    2024.09 - 2024.12
                  </p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">
                실시간 보안 뉴스 큐레이션 플랫폼. AI 기반 뉴스 수집 및 분류
                시스템으로 최신 보안 이슈를 자동으로 수집하고 카테고리별로
                분류하여 제공합니다.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded bg-[#404249] text-gray-300 text-xs font-semibold">
                  Next.js
                </span>
                <span className="px-3 py-1 rounded bg-[#404249] text-gray-300 text-xs font-semibold">
                  FastAPI
                </span>
                <span className="px-3 py-1 rounded bg-[#404249] text-gray-300 text-xs font-semibold">
                  Google Cloud Run
                </span>
                <span className="px-3 py-1 rounded bg-[#404249] text-gray-300 text-xs font-semibold">
                  Docker
                </span>
                <span className="px-3 py-1 rounded bg-[#404249] text-gray-300 text-xs font-semibold">
                  SuperBase
                </span>
              </div>

              <a
                href="https://security-news-258137341860.asia-northeast1.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#5865f2] text-white font-semibold hover:bg-[#4752c4] transition-all hover:shadow-lg"
              >
                <span>웹사이트 방문</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* 프로젝트 상세 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 주요 기능 카드 */}
              <div className="bg-[#2b2d31] rounded-lg p-6">
                <h4 className="text-white text-lg font-bold mb-4">주요 기능</h4>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5865f2] mt-1">▸</span>
                    <span>실시간 보안 뉴스 자동 수집 및 업데이트</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5865f2] mt-1">▸</span>
                    <span>실시간 인기 검색어와 오늘의 보안뉴스 통계 제공</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5865f2] mt-1">▸</span>
                    <span>
                      보안뉴스에 대해 토론이 가능한 실시간 채팅방 시스템
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5865f2] mt-1">▸</span>
                    <span>
                      카테고리별 필터링 (취약점, 해킹, 보안정책, 보안기술 등)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5865f2] mt-1">▸</span>
                    <span>
                      뉴스 API를 서버캐쉬에 저장하여 효율적인 데이터 관리
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5865f2] mt-1">▸</span>
                    <span>빠른 로딩과 안정적인 서비스 제공</span>
                  </li>
                </ul>
              </div>

              {/* 기술 스택 카드 */}
              <div className="bg-[#2b2d31] rounded-lg p-6">
                <h4 className="text-white text-lg font-bold mb-4">기술 스택</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-[#00b0f4] font-semibold mb-1">
                      Frontend
                    </p>
                    <p className="text-gray-300 text-sm">
                      Next.js, React, Tailwind CSS, Typescript
                    </p>
                  </div>
                  <div>
                    <p className="text-[#00b0f4] font-semibold mb-1">Backend</p>
                    <p className="text-gray-300 text-sm">Python, FastAPI</p>
                  </div>
                  <div>
                    <p className="text-[#00b0f4] font-semibold mb-1">
                      Database
                    </p>
                    <p className="text-gray-300 text-sm">SuperBase</p>
                  </div>
                  <div>
                    <p className="text-[#00b0f4] font-semibold mb-1">
                      Deployment
                    </p>
                    <p className="text-gray-300 text-sm">
                      Google Cloud Run / Docker
                    </p>
                  </div>
                </div>
              </div>

              {/* 프로젝트 목표 카드 */}
              <div className="bg-[#2b2d31] rounded-lg p-6 md:col-span-2">
                <h4 className="text-white text-lg font-bold mb-4">
                  프로젝트 목표
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  최신 보안 트렌드를 광고 없이 한눈에 파악할 수 있도록, 흩어진
                  보안 뉴스를 자동으로 수집하고 분류하여 제공하는 플랫폼을
                  구축하는 것이 목표입니다. Google Cloud Run과 Docker를 활용한
                  서버리스 아키텍처로 확장 가능하고 안정적인 서비스를
                  제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
