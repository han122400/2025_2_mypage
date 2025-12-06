'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Users,
  Rocket,
  ExternalLink,
  Star,
  GitFork,
  Clock,
  Calendar,
  MapPin,
  Link2,
  Mail,
  AlertTriangle,
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import ProjectCard from '@/components/ProjectCard'

interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  email: string | null
  blog: string | null
  public_repos: number
  followers: number
  following: number
  created_at: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
  fork?: boolean
}

interface LanguageStats {
  [language: string]: number
}

interface RepoLanguages {
  [repoId: number]: LanguageStats
}

function PortfolioContent() {
  const searchParams = useSearchParams()
  const userParam = searchParams.get('user')

  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([])
  const [showAllRepos, setShowAllRepos] = useState(false)
  const [languageStats, setLanguageStats] = useState<LanguageStats>({})
  const [repoLanguages, setRepoLanguages] = useState<RepoLanguages>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [githubUsername, setGithubUsername] = useState(userParam || 'han122400')

  useEffect(() => {
    if (userParam) {
      setGithubUsername(userParam)
    }
  }, [userParam])

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!githubUsername) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)
      setUser(null)
      setRepos([])
      setAllRepos([])
      setLanguageStats({})
      setRepoLanguages({})

      try {
        const headers: HeadersInit = {
          Accept: 'application/vnd.github.v3+json',
        }

        const apiKey = process.env.NEXT_PUBLIC_GITHUB_API_KEY
        if (apiKey) {
          headers['Authorization'] = `Bearer ${apiKey}`
        }

        // 사용자 정보 가져오기
        const userResponse = await fetch(
          `https://api.github.com/users/${githubUsername}`,
          { headers }
        )

        if (!userResponse.ok) {
          if (userResponse.status === 404) {
            throw new Error('없는 아이디입니다. 다시 검색해 주세요')
          }
          throw new Error('GitHub 사용자를 찾을 수 없습니다.')
        }

        const userData = await userResponse.json()
        setUser(userData)

        // 저장소 정보 가져오기
        const reposResponse = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=8`,
          { headers }
        )

        if (!reposResponse.ok) {
          throw new Error('GitHub 저장소를 불러올 수 없습니다.')
        }

        const reposData = await reposResponse.json()
        setRepos(reposData)

        // 모든 저장소의 언어 통계 수집 (원그래프용)
        const allReposResponse = await fetch(
          `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`,
          { headers }
        )

        if (allReposResponse.ok) {
          const allReposData = await allReposResponse.json()
          setAllRepos(allReposData)
          const languageCounts: LanguageStats = {}
          const repoLangs: RepoLanguages = {}

          // 각 저장소의 상세 언어 정보 수집
          for (const repo of allReposData) {
            if (repo.language) {
              languageCounts[repo.language] =
                (languageCounts[repo.language] || 0) + 1
            }

            // 모든 저장소의 언어 바이트 정보 가져오기
            try {
              const langResponse = await fetch(
                `https://api.github.com/repos/${githubUsername}/${repo.name}/languages`,
                { headers }
              )
              if (langResponse.ok) {
                const langData = await langResponse.json()
                repoLangs[repo.id] = langData
              }
            } catch (err) {
              console.error(`Failed to fetch languages for ${repo.name}`, err)
            }
          }

          setLanguageStats(languageCounts)
          setRepoLanguages(repoLangs)
        }

        setLoading(false)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
        )
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [githubUsername])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

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
    default: '#8b949e',
  }

  const getLanguageColor = (language: string) => {
    return languageColors[language] || languageColors.default
  }

  // 언어 통계 계산
  const calculateLanguageStats = () => {
    const total = Object.values(languageStats).reduce(
      (sum, count) => sum + count,
      0
    )
    const sortedLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5) // 상위 5개만

    return sortedLanguages.map(([language, count]) => ({
      language,
      count,
      percentage: ((count / total) * 100).toFixed(1),
      color: getLanguageColor(language),
    }))
  }

  // 원그래프 데이터 계산
  const calculatePieChart = () => {
    const total = Object.values(languageStats).reduce(
      (sum, count) => sum + count,
      0
    )
    const sortedLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6) // 상위 6개

    let currentAngle = 0
    return sortedLanguages.map(([language, count]) => {
      const percentage = (count / total) * 100
      const angle = (percentage / 100) * 360
      const startAngle = currentAngle
      currentAngle += angle

      return {
        language,
        percentage: percentage.toFixed(1),
        startAngle,
        angle,
        color: getLanguageColor(language),
      }
    })
  }

  // SVG 경로 생성 (원그래프 조각)
  const createArc = (startAngle: number, angle: number, radius = 80) => {
    const startRad = (startAngle - 90) * (Math.PI / 180)
    const endRad = (startAngle + angle - 90) * (Math.PI / 180)
    const x1 = 100 + radius * Math.cos(startRad)
    const y1 = 100 + radius * Math.sin(startRad)
    const x2 = 100 + radius * Math.cos(endRad)
    const y2 = 100 + radius * Math.sin(endRad)
    const largeArc = angle > 180 ? 1 : 0

    return `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
  }

  // 저장소별 언어 바 계산
  const calculateRepoLanguages = (repoId: number) => {
    const languages = repoLanguages[repoId]
    if (!languages) return []

    const total = Object.values(languages).reduce(
      (sum, bytes) => sum + bytes,
      0
    )
    return Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3) // 상위 3개
      .map(([language, bytes]) => ({
        language,
        percentage: ((bytes / total) * 100).toFixed(1),
        color: getLanguageColor(language),
      }))
  }

  return (
    <div className="flex min-h-screen bg-[#313338]">
      <Sidebar currentPage="portfolio" />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col ml-72">
        <Header icon={Users} title="포트폴리오" />

        {/* 컨텐츠 영역 */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            {/* GitHub 사용자명 입력 */}
            {!githubUsername && (
              <div className="bg-[#2b2d31] rounded-lg p-8 mb-6 text-center">
                <h2 className="text-white text-3xl font-bold mb-4">
                  GitHub 포트폴리오
                </h2>
                <p className="text-gray-300 mb-6">
                  GitHub 사용자명을 입력하여 프로필과 프로젝트를 불러오세요.
                </p>
                <div className="flex gap-3 max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="GitHub 사용자명 (예: octocat)"
                    className="flex-1 px-4 py-3 rounded bg-[#1e1f22] text-white border border-[#404249] focus:border-[#5865f2] outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        setGithubUsername((e.target as HTMLInputElement).value)
                      }
                    }}
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget
                        .previousElementSibling as HTMLInputElement
                      if (input.value) {
                        setGithubUsername(input.value)
                      }
                    }}
                    className="px-8 py-3 rounded bg-[#5865f2] text-white font-semibold hover:bg-[#4752c4] transition-colors"
                  >
                    불러오기
                  </button>
                </div>
              </div>
            )}

            {/* GitHub 프로필 및 저장소 */}
            {githubUsername && (
              <>
                {loading && (
                  <div className="text-center py-12">
                    <div className="inline-block w-12 h-12 border-4 border-[#5865f2] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 mt-4 text-lg">
                      {githubUsername}의 프로필을 불러오는 중...
                    </p>
                  </div>
                )}

                {!loading && error && (
                  <div className="bg-[#2b2d31] rounded-lg p-8 mb-6 text-center">
                    <h3 className="text-white text-2xl font-bold mb-3">
                      오류가 발생했습니다
                    </h3>
                    <p className="text-[#ed4245] text-xl font-semibold mb-6">
                      {error}
                    </p>
                    <button
                      onClick={() => {
                        setGithubUsername('')
                        setUser(null)
                        setRepos([])
                        setError(null)
                      }}
                      className="px-6 py-3 rounded bg-[#5865f2] text-white text-base font-semibold hover:bg-[#4752c4] transition-colors"
                    >
                      다시 시도
                    </button>
                  </div>
                )}

                {!loading && !error && user && (
                  <>
                    {/* 사용자 프로필 카드 */}
                    <div className="bg-[#2b2d31] rounded-lg p-8 mb-6">
                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* 왼쪽: 프로필 정보 */}
                        <div className="flex-1 flex flex-col">
                          <div>
                            <div className="flex items-start gap-6">
                              <img
                                src={user.avatar_url}
                                alt={user.login}
                                className="w-32 h-32 rounded-full border-4 border-[#5865f2]"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <h2 className="text-white text-3xl font-bold mb-1">
                                      {user.name || user.login}
                                    </h2>
                                    <p className="text-gray-400 text-lg">
                                      @{user.login}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setGithubUsername('')
                                      setUser(null)
                                      setRepos([])
                                    }}
                                    className="px-4 py-2 rounded bg-[#404249] text-white text-sm font-semibold hover:bg-[#4e5058] transition-colors"
                                  >
                                    사용자 변경
                                  </button>
                                </div>

                                {user.bio && (
                                  <p className="text-gray-300 mb-4 text-lg">
                                    {user.bio}
                                  </p>
                                )}

                                <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
                                  {user.location && (
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4" />
                                      <span>{user.location}</span>
                                    </div>
                                  )}
                                  {user.email && (
                                    <div className="flex items-center gap-2">
                                      <Mail className="w-4 h-4" />
                                      <span>{user.email}</span>
                                    </div>
                                  )}
                                  {user.blog && (
                                    <div className="flex items-center gap-2">
                                      <Link2 className="w-4 h-4" />
                                      <a
                                        href={
                                          user.blog.startsWith('http')
                                            ? user.blog
                                            : `https://${user.blog}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#00b0f4] hover:underline"
                                      >
                                        {user.blog}
                                      </a>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                      {formatDate(user.created_at)} 가입
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 저장소, 팔로워, 팔로잉 통계 카드 */}
                          <div className="grid grid-cols-3 gap-4 mt-auto pt-6 border-t border-[#404249]">
                            <div className="bg-[#1e1f22] rounded-lg p-4 text-center">
                              <div className="text-white text-3xl font-bold mb-1">
                                {user.public_repos}
                              </div>
                              <div className="text-gray-400 text-sm">
                                저장소
                              </div>
                            </div>
                            <div className="bg-[#1e1f22] rounded-lg p-4 text-center">
                              <div className="text-white text-3xl font-bold mb-1">
                                {user.followers}
                              </div>
                              <div className="text-gray-400 text-sm">
                                팔로워
                              </div>
                            </div>
                            <div className="bg-[#1e1f22] rounded-lg p-4 text-center">
                              <div className="text-white text-3xl font-bold mb-1">
                                {user.following}
                              </div>
                              <div className="text-gray-400 text-sm">
                                팔로잉
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 오른쪽: 언어 원그래프 */}
                        {Object.keys(languageStats).length > 0 && (
                          <div className="lg:w-80 flex flex-col items-center justify-center">
                            <h3 className="text-white text-lg font-semibold mb-4">
                              언어 사용 분포
                            </h3>
                            <svg
                              width="200"
                              height="200"
                              viewBox="0 0 200 200"
                              className="mb-4"
                            >
                              {calculatePieChart().map((slice) => (
                                <path
                                  key={slice.language}
                                  d={createArc(slice.startAngle, slice.angle)}
                                  fill={slice.color}
                                  className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                              ))}
                              <circle cx="100" cy="100" r="50" fill="#2b2d31" />
                            </svg>
                            <div className="space-y-2 w-full">
                              {calculatePieChart().map(
                                ({ language, percentage, color }) => (
                                  <div
                                    key={language}
                                    className="flex items-center justify-between"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: color }}
                                      />
                                      <span className="text-gray-300 text-sm font-medium">
                                        {language}
                                      </span>
                                    </div>
                                    <span className="text-gray-400 text-sm">
                                      {percentage}%
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 최근 프로젝트 */}
                    <div className="mb-6">
                      <h3 className="text-white text-2xl font-bold mb-4">
                        최근 프로젝트
                      </h3>
                    </div>

                    {repos.length === 0 ? (
                      <div className="bg-[#2b2d31] rounded-lg p-8 text-center">
                        <p className="text-gray-400">공개 저장소가 없습니다.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(showAllRepos ? allRepos : repos).map((repo) => (
                          <ProjectCard
                            key={repo.id}
                            repo={repo}
                            repoLanguages={calculateRepoLanguages(repo.id)}
                            formatDate={formatDate}
                          />
                        ))}
                      </div>
                    )}

                    {repos.length > 0 && allRepos.length > 8 && (
                      <div className="mt-6 text-center">
                        <button
                          onClick={() => setShowAllRepos(!showAllRepos)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#404249] text-white font-semibold hover:bg-[#4e5058] transition-colors"
                        >
                          <span>
                            {showAllRepos ? '접기' : '모든 프로젝트 보기'}
                          </span>
                          <Rocket className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function Portfolio() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen bg-[#313338]">
        <Sidebar currentPage="portfolio" />
        <main className="flex-1 flex flex-col ml-72">
          <Header icon={Users} title="포트폴리오" />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto text-center py-20">
              <div className="inline-block w-8 h-8 border-4 border-[#5865f2] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 mt-4">로딩 중...</p>
            </div>
          </div>
        </main>
      </div>
    }>
      <PortfolioContent />
    </Suspense>
  )
}
