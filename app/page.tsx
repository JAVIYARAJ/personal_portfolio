import PortfolioHome from '@/components/portfolio/portfolio-home'
import { fetchGitHubStats, fetchStarredRepos } from '@/lib/github'

export default async function Home() {
  const [repos, githubStats] = await Promise.all([
    fetchStarredRepos(),
    fetchGitHubStats(),
  ])
  return <PortfolioHome repos={repos} githubStats={githubStats} />
}
