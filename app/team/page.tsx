'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Users,
  Target,
  Handshake,
  BookOpen,
  Phone,
  Github,
  ExternalLink,
  School,
} from 'lucide-react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { useSnowMode } from '@/app/layout'

export default function Team() {
  const { snowMode } = useSnowMode()
  const teamMembers = [
    {
      name: '김서진',
      role: '팀장',
      avatar: 'K',
      color: '#5865f2',
      description: '풀스택 개발자이자 팀 리더',
      skills: ['React', 'Next.js', 'TypeScript', 'GCP'],
      studentId: '92212764',
      phone: '010-7124-6930',
      github: 'https://github.com/Daru0613',
      githubUsername: 'Daru0613',
    },
    {
      name: '박한빈',
      role: 'CTO',
      avatar: 'P',
      color: '#eb459e',
      description: '개발총괄 및 배포',
      skills: ['next.js', 'FastAPI', 'TypeScript', 'Docker', 'GCP'],
      studentId: '92212867',
      phone: '010-9737-1732',
      github: 'https://github.com/han122400',
      githubUsername: 'han122400',
    },
    {
      name: '이지훈',
      role: 'UI/UX 디자이너',
      avatar: 'J',
      color: '#57f287',
      description: '사용자 중심 디자인',
      skills: ['figma', 'Next.js', 'React', 'Tailwind CSS'],
      studentId: '92213031',
      phone: '010-4753-7159',
      github: 'https://github.com/LEEJIHUN6844',
      githubUsername: 'LEEJIHUN6844',
    },
    {
      name: '윤주혁',
      role: '데이터베이스 관리자',
      avatar: 'Y',
      color: '#fee75c',
      description: '데이터 아키텍처 및 최적화',
      skills: ['SuperBase', 'SQL', 'GCP', 'FastAPI'],
      studentId: '92410847',
      phone: '010-9950-0657',
      github: 'https://github.com/Juhyeok0603',
      githubUsername: 'Juhyeok0603',
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#313338] relative">
      <Sidebar currentPage="team" />

      {/* 메인 컨텐츠 */}
      <main className="flex-1 flex flex-col ml-72 relative">
        <Header icon={Users} title="팀 소개" />

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
            {/* 팀 소개 */}
            <div className="mb-8">
              <h2 className="text-white text-3xl font-bold mb-4">
                우리 팀을 소개합니다
              </h2>
              <p className="text-gray-300 text-lg">
                다양한 전문 분야를 가진 팀원들이 모여 최고의 결과물을
                만들어냅니다.
              </p>
            </div>

            {/* 팀원 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <Link
                  key={index}
                  href={`/portfolio?user=${member.githubUsername}`}
                  className="bg-[#2b2d31] rounded-lg p-6 hover:bg-[#383a40] transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shrink-0"
                      style={{ backgroundColor: member.color }}
                    >
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-xl font-bold mb-1">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        {member.role}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <School className="w-3 h-3" />
                          <span>{member.studentId}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <Phone className="w-3 h-3" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                          <Github className="w-3 h-3" />
                          <span
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(member.github, '_blank')
                            }}
                            className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            GitHub
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{member.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 rounded text-white text-xs font-semibold"
                        style={{ backgroundColor: member.color }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>

            {/* 팀 목표 */}
            <div className="mt-8 bg-[#2b2d31] rounded-lg p-6">
              <h3 className="text-white text-2xl font-bold mb-4">팀 목표</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-[#5865f2] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      실시간 보안 뉴스 플랫폼 구축
                    </h4>
                    <p className="text-gray-300">
                      API 기반 뉴스 수집 및 분류 시스템을 개발하여 최신 보안
                      이슈를 자동으로 수집하고 카테고리별로 제공합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Handshake className="w-5 h-5 text-[#5865f2] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      팀원 간 협업 및 역할 분담
                    </h4>
                    <p className="text-gray-300">
                      프론트엔드, 백엔드, 디자인, 데이터베이스 관리자로 역할을
                      분담하여 효율적인 협업 체계를 구축합니다.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-[#5865f2] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">
                      최신 기술 스택 활용
                    </h4>
                    <p className="text-gray-300">
                      Next.js, FastAPI, Supabase 등 최신 기술을 활용하여 학습한
                      내용을 실제 프로젝트에 적용하고 경험을 쌓습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
