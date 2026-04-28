export type Repo = {
  name: string
  description: string
  stars: number
  language: string
  url: string
  private: boolean
}

export type GitHubStats = {
  repoCount: number
}

const GITHUB_USERNAME = 'JAVIYARAJ'

const GITHUB_API_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
}

const MAX_REPOS = 6

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const token = process.env.GITHUB_TOKEN
  const headers: HeadersInit = {
    ...GITHUB_API_HEADERS,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  try {
    let repoCount = 0
    let page = 1

    while (true) {
      const endpoint = token
        ? `https://api.github.com/user/repos?per_page=100&type=all&page=${page}`
        : `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner&page=${page}`

      const res = await fetch(endpoint, { headers, next: { revalidate: 3600 } })
      if (!res.ok) break

      const repos: Array<unknown> = await res.json()
      repoCount += repos.length

      if (repos.length < 100) break
      page++
    }

    return { repoCount }
  } catch {
    return { repoCount: 0 }
  }
}

export async function fetchStarredRepos(): Promise<Repo[]> {
  const token = process.env.GITHUB_TOKEN

  const endpoint = token
    ? `https://api.github.com/user/starred?per_page=${MAX_REPOS}&sort=created&direction=desc`
    : `https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=${MAX_REPOS}&sort=created&direction=desc`

  const headers: HeadersInit = {
    ...GITHUB_API_HEADERS,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  try {
    const res = await fetch(endpoint, {
      headers,
      next: { revalidate: 5 },
    })

    if (!res.ok) return []

    const data: Array<{
      name: string
      description: string | null
      stargazers_count: number
      language: string | null
      html_url: string
      private: boolean
    }> = await res.json()

    return data.map((repo) => ({
      name: repo.name,
      description: repo.description ?? 'No description provided.',
      stars: repo.stargazers_count,
      language: repo.language ?? 'Unknown',
      url: repo.html_url,
      private: repo.private,
    }))
  } catch {
    return []
  }
}
