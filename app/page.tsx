import PortfolioHome from '@/components/portfolio/portfolio-home'
import { fetchGitHubStats, fetchRecentActivity, fetchStarredRepos } from '@/lib/github'

export default async function Home() {
  const [repos, githubStats, activity] = await Promise.all([
    fetchStarredRepos(),
    fetchGitHubStats(),
    fetchRecentActivity(),
  ])
  return <PortfolioHome repos={repos} githubStats={githubStats} activity={activity} />
}
