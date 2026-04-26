export type Repo = {
  name: string
  description: string
  stars: number
  language: string
  url: string
}

export type GitHubStats = {
  repoCount: number
  commitCount: number
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
    const userEndpoint = token
      ? 'https://api.github.com/user'
      : `https://api.github.com/users/${GITHUB_USERNAME}`

    const userRes = await fetch(userEndpoint, { headers, next: { revalidate: 5 } })
    if (!userRes.ok) return { repoCount: 0, commitCount: 0 }

    const userData = await userRes.json()
    const repoCount = token
      ? (userData.public_repos ?? 0) + (userData.total_private_repos ?? 0)
      : (userData.public_repos ?? 0)

    if (!token) return { repoCount, commitCount: 0 }

    // All owned non-fork repos (private included with token)
    const reposRes = await fetch(
      'https://api.github.com/user/repos?per_page=100&type=owner',
      { headers, next: { revalidate: 5 } },
    )
    if (!reposRes.ok) return { repoCount, commitCount: 0 }

    const repos: Array<{ name: string; fork: boolean; default_branch: string }> =
      await reposRes.json()

    // Per repo: walk every branch and deduplicate commit SHAs.
    // Process default branch first so feature branches can exit early once
    // they reach commits that are already in `seen`.
    const repoCommitCounts = await Promise.all(
      repos
        .filter((r) => !r.fork)
        .map(async (repo) => {
          const branchesRes = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/branches?per_page=100`,
            { headers, next: { revalidate: 5 } },
          )
          if (!branchesRes.ok) return 0

          const branches: Array<{ name: string; commit: { sha: string } }> =
            await branchesRes.json()

          // Default branch first
          const ordered = [
            ...branches.filter((b) => b.name === repo.default_branch),
            ...branches.filter((b) => b.name !== repo.default_branch),
          ]

          const seen = new Set<string>()

          for (const branch of ordered) {
            let page = 1
            while (true) {
              const res = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits` +
                  `?sha=${branch.commit.sha}&author=${GITHUB_USERNAME}&per_page=100&page=${page}`,
                { headers, next: { revalidate: 5 } },
              )
              if (!res.ok) break

              const commits: Array<{ sha: string }> = await res.json()
              if (commits.length === 0) break

              let foundNew = false
              for (const { sha } of commits) {
                if (!seen.has(sha)) {
                  seen.add(sha)
                  foundNew = true
                }
              }

              // Once a whole page contains only already-seen SHAs we've reached
              // shared history — everything deeper is already counted.
              if (!foundNew) break
              if (commits.length < 100) break
              page++
            }
          }

          return seen.size
        }),
    )

    const commitCount = repoCommitCounts.reduce((sum, n) => sum + n, 0)
    return { repoCount, commitCount }
  } catch {
    return { repoCount: 0, commitCount: 0 }
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
    }> = await res.json()

    return data.map((repo) => ({
      name: repo.name,
      description: repo.description ?? 'No description provided.',
      stars: repo.stargazers_count,
      language: repo.language ?? 'Unknown',
      url: repo.html_url,
    }))
  } catch {
    return []
  }
}
