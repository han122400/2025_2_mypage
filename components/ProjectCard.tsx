import { Star, GitFork } from 'lucide-react'

interface ProjectCardProps {
  repo: {
    id: number
    name: string
    description: string | null
    html_url: string
    homepage: string | null
    stargazers_count: number
    forks_count: number
    updated_at: string
    topics: string[]
  }
  repoLanguages: {
    language: string
    percentage: string
    color: string
  }[]
  formatDate: (dateString: string) => string
}

export default function ProjectCard({
  repo,
  repoLanguages,
  formatDate,
}: ProjectCardProps) {
  return (
    <div className="bg-[#2b2d31] rounded-lg p-6 hover:bg-[#383a40] transition-colors">
      <h4 className="text-white text-xl font-bold mb-3">{repo.name}</h4>

      {repo.description && (
        <p className="text-gray-300 mb-4 line-clamp-2">{repo.description}</p>
      )}

      {/* 주요 언어 태그 */}
      {repoLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repoLanguages.slice(0, 3).map(({ language, color }) => (
            <span
              key={language}
              className="px-3 py-1 rounded bg-[#1e1f22] text-sm font-semibold border"
              style={{
                color: color,
                borderColor: `${color}40`,
              }}
            >
              {language}
            </span>
          ))}
        </div>
      )}

      {/* 언어 사용 바 */}
      {repoLanguages.length > 0 && (
        <div className="mb-4">
          <div className="flex h-2 rounded-full overflow-hidden bg-[#1e1f22]">
            {repoLanguages.map(({ language, percentage, color }) => (
              <div
                key={language}
                style={{
                  backgroundColor: color,
                  width: `${percentage}%`,
                }}
                className="transition-all duration-500"
                title={`${language} ${percentage}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {repoLanguages.map(({ language, percentage, color }) => (
              <div key={language} className="flex items-center gap-1 text-xs">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-400">{language}</span>
                <span className="text-gray-500">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="w-4 h-4" />
          <span>{repo.forks_count}</span>
        </div>
      </div>

      <div className="text-xs text-gray-500 mb-4">
        마지막 업데이트: {formatDate(repo.updated_at)}
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 3).map((topic, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded bg-[#404249] text-gray-300 text-xs font-semibold"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-auto pt-4 border-t border-[#404249]">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded bg-[#1e1f22] text-white hover:bg-[#404249] transition-colors text-sm font-semibold border border-[#404249]"
        >
          Repo
        </a>
        {repo.homepage ? (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded bg-[#5865f2] text-white hover:bg-[#4752c4] transition-colors text-sm font-semibold"
          >
            Demo
          </a>
        ) : (
          <button
            disabled
            className="px-4 py-2 rounded bg-[#1e1f22] text-gray-500 text-sm font-semibold border border-dashed border-[#404249] cursor-not-allowed"
          >
            데모 준비중
          </button>
        )}
      </div>
    </div>
  )
}
