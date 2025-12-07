'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Hash,
  Users,
  Rocket,
  Target,
  Zap,
  Phone,
  Mail,
  GraduationCap,
  Globe,
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useSnowMode } from '@/app/layout'

interface LanguageStats {
  [language: string]: number
}

export default function Home() {
  const { snowMode } = useSnowMode()
  const [languageStats, setLanguageStats] = useState<LanguageStats>({})
  const [loading, setLoading] = useState(true)
  const [githubUsername, setGithubUsername] = useState('han122400')

  useEffect(() => {
    const fetchLanguageStats = async () => {
      setLoading(true)
      setLanguageStats({})

      try {
        const headers: HeadersInit = {
          Accept: 'application/vnd.github.v3+json',
        }

        const apiKey = process.env.NEXT_PUBLIC_GITHUB_API_KEY
        if (apiKey) {
          headers['Authorization'] = `Bearer ${apiKey}`
        }

        // 모든 저장소 가져오기
        const reposResponse = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?per_page=100`,
          { headers }
        )

        if (reposResponse.ok) {
          const repos = await reposResponse.json()
          const languageBytes: LanguageStats = {}

          // 각 저장소의 언어 정보 수집
          for (const repo of repos) {
            try {
              const langResponse = await fetch(
                `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`,
                { headers }
              )
              if (langResponse.ok) {
                const langData = await langResponse.json()
                // 바이트 수 합산
                Object.entries(langData).forEach(([lang, bytes]) => {
                  languageBytes[lang] =
                    (languageBytes[lang] || 0) + (bytes as number)
                })
              }
            } catch (err) {
              console.error(`Failed to fetch languages for ${repo.name}`)
            }
          }

          setLanguageStats(languageBytes)
        }
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch language stats:', err)
        setLoading(false)
      }
    }

    fetchLanguageStats()
  }, [githubUsername])

  // 언어별 색상 매핑
  const languageColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#9370DB',
    Python: '#007ACC',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    Vue: '#41b883',
    PLpgSQL: '#336791',
    default: '#8b949e',
  }

  const getLanguageColor = (language: string) => {
    return languageColors[language] || languageColors.default
  }

  // 언어 통계 계산
  const calculateLanguagePercentages = () => {
    const total = Object.values(languageStats).reduce(
      (sum, bytes) => sum + bytes,
      0
    )
    if (total === 0) return []

    return Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5) // 상위 5개
      .map(([language, bytes]) => ({
        language,
        percentage: ((bytes / total) * 100).toFixed(1),
        color: getLanguageColor(language),
      }))
  }

  return (
    <div className="flex min-h-screen bg-[#313338] relative">
      <Sidebar currentPage="home" />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col ml-72 relative">
        <Header icon={Hash} title="홈" />

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
            {/* 프로필 카드 */}
            <div className="bg-[#2b2d31] rounded-lg p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-64 h-64 rounded-2xl overflow-hidden shrink-0 border-4 border-[#5865f2]">
                  <Image
                    src="/img/me.png"
                    alt="박한빈"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-white text-3xl font-bold mb-2">박한빈</h1>
                  <p className="text-cyan-400 text-xl mb-4">정보보호학과</p>
                  <p className="text-gray-300 mb-6">
                    멋쟁이사자처럼 13기 • Fullstack Developer
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                      <GraduationCap className="w-5 h-5 text-cyan-400" />
                      <span>학번: 92212867</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                      <Phone className="w-5 h-5 text-cyan-400" />
                      <a
                        href="tel:010-9737-1732"
                        className="hover:text-cyan-400 transition-colors"
                      >
                        010-9737-1732
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                      <Mail className="w-5 h-5 text-cyan-400" />
                      <a
                        href="mailto:vinny122400@gmail.com"
                        className="hover:text-cyan-400 transition-colors"
                      >
                        vinny122400@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                      <Globe className="w-5 h-5 text-cyan-400" />
                      <a
                        href="https://vercel.com/parkhanbins-projects"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-cyan-400 transition-colors"
                      >
                        Vercel 사이트
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 기술 스택 카드 */}
            <div className="bg-[#2b2d31] rounded-lg p-6 mb-6">
              <h2 className="text-white text-2xl font-bold mb-4">기술 스택</h2>

              {/* 주요 기술 로고 */}
              <div className="mb-8">
                <h3 className="text-gray-400 text-sm font-semibold mb-4">
                  주요 프레임워크:
                </h3>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  <div className="group flex flex-col items-center gap-3">
                    <div className="w-45 h-24 bg-white rounded-xl p-4 flex items-center justify-center transition-all hover:scale-105 shadow-lg hover:shadow-cyan-500/50">
                      <Image
                        src="/logo/Nextj.svg"
                        alt="Next.js"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-300 text-sm font-semibold group-hover:text-cyan-400 transition-colors">
                      Next.js
                    </span>
                  </div>
                  <div className="group flex flex-col items-center gap-3">
                    <div className="w-45 h-24 bg-white rounded-xl p-4 flex items-center justify-center transition-all hover:scale-105 shadow-lg hover:shadow-cyan-500/50">
                      <Image
                        src="/logo/fastapi.png"
                        alt="FastAPI"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-300 text-sm font-semibold group-hover:text-cyan-400 transition-colors">
                      FastAPI
                    </span>
                  </div>
                  <div className="group flex flex-col items-center gap-3">
                    <div className="w-45 h-24 bg-white rounded-xl p-4 flex items-center justify-center transition-all hover:scale-105 shadow-lg hover:shadow-cyan-500/50">
                      <Image
                        src="/logo/supabase.png"
                        alt="Supabase"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-300 text-sm font-semibold group-hover:text-cyan-400 transition-colors">
                      Supabase
                    </span>
                  </div>
                  <div className="group flex flex-col items-center gap-3">
                    <div className="w-45 h-24 bg-white rounded-xl p-4 flex items-center justify-center transition-all hover:scale-105 shadow-lg hover:shadow-cyan-500/50">
                      <Image
                        src="/logo/docker.png"
                        alt="Docker"
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-gray-300 text-sm font-semibold group-hover:text-cyan-400 transition-colors">
                      Docker
                    </span>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-4 border-[#5865f2] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-400 mt-4">
                    {githubUsername}의 기술 스택을 불러오는 중...
                  </p>
                </div>
              ) : calculateLanguagePercentages().length > 0 ? (
                <div className="flex flex-wrap gap-3 mb-6">
                  {calculateLanguagePercentages().map(({ language, color }) => (
                    <span
                      key={language}
                      className="px-4 py-2 rounded-full bg-[#1e1f22] text-sm font-semibold border"
                      style={{
                        color: color,
                        borderColor: `${color}40`,
                      }}
                    >
                      {language}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-2 rounded-full bg-[#1e1f22] text-gray-500 text-sm font-semibold border border-gray-500/30">
                    기술 스택 로딩 실패
                  </span>
                </div>
              )}

              {/* 언어 사용 비율 */}
              <div className="mt-4">
                <h3 className="text-gray-400 text-sm font-semibold mb-3">
                  언어 사용 비율:
                </h3>
                {loading ? (
                  <div className="text-gray-500 text-sm">로딩 중...</div>
                ) : calculateLanguagePercentages().length > 0 ? (
                  <>
                    <div className="flex h-2 rounded-full overflow-hidden bg-[#1e1f22] mb-3">
                      {calculateLanguagePercentages().map(
                        ({ language, percentage, color }) => (
                          <div
                            key={language}
                            className="transition-all duration-500"
                            style={{
                              backgroundColor: color,
                              width: `${percentage}%`,
                            }}
                            title={`${language} ${percentage}%`}
                          />
                        )
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {calculateLanguagePercentages().map(
                        ({ language, percentage, color }) => (
                          <div
                            key={language}
                            className="flex items-center gap-2"
                          >
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            <span className="text-gray-300 text-sm">
                              {language}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {percentage}%
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500 text-sm">
                    데이터를 불러올 수 없습니다.
                  </div>
                )}
              </div>
            </div>

            {/* 소개 섹션 */}
            <div className="bg-[#2b2d31] rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-lg bg-black flex items-center justify-center">
                  <div className="text-2xl font-bold">
                    <span className="text-orange-500">▶</span>
                    <span className="text-white">▶</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-orange-500 text-2xl font-bold">
                    멋쟁이사자처럼 13기
                  </h2>
                  <p className="text-gray-400">
                    Like Lion 13th - 웹서버보안프로그래밍
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-6">
                {/* 활동 내용 */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5 text-orange-500" />
                    <h3 className="text-orange-500 text-lg font-bold">
                      활동 내용
                    </h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>웹 개발 기초부터 심화까지 학습</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>React, Next.js 프론트엔드 개발</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>백엔드 API 설계 및 구현</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>팀 프로젝트 및 해커톤 참여</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>GCP, 오라클 등 클라우드 서비스 활용</span>
                    </li>
                  </ul>
                </div>

                {/* 주요 성과 */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-orange-500" />
                    <h3 className="text-orange-500 text-lg font-bold">
                      주요 성과
                    </h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>GitHub 포트폴리오 웹사이트 구축</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>실시간 프로젝트 데이터 연동</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>반응형 UI/UX 디자인 구현</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>여러가지 기술 스택 활용</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>도커를 활용하여 서비스 배포</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 슬로건 */}
              <div className="bg-[#1e1f22] rounded-lg p-4">
                <p className="text-gray-300 text-center italic">
                  "내 아이디어를 세상에 출시하자" - 멋쟁이사자처럼
                </p>
              </div>
            </div>

            {/* 빠른 링크 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/team"
                className="bg-[#2b2d31] rounded-lg p-6 hover:bg-[#383a40] transition-colors"
              >
                <Users className="w-10 h-10 text-[#5865f2] mb-3" />
                <h3 className="text-white text-xl font-bold mb-2">팀 소개</h3>
                <p className="text-gray-400">우리 팀의 멤버들을 만나보세요</p>
              </Link>
              <Link
                href="/projects"
                className="bg-[#2b2d31] rounded-lg p-6 hover:bg-[#383a40] transition-colors"
              >
                <Rocket className="w-10 h-10 text-[#5865f2] mb-3" />
                <h3 className="text-white text-xl font-bold mb-2">
                  팀 프로젝트
                </h3>
                <p className="text-gray-400">
                  우리가 만든 프로젝트들을 확인하세요
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
