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
      next: { revalidate: 86400 },
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

export type GitHubActivity = {
  id: string
  // Short-form repo name, e.g. "split_ease".
  repo: string
  // What happened, phrased to precede the repo name: "Pushed to", "Merged PR #18 in", ...
  action: string
  // Secondary line for the Notification Center: branch, PR title, release name or repo description.
  detail: string
  // Where tapping the notification goes: the commit, PR, release or repo.
  url: string
  createdAt: string
}

// Only recent activity is worth announcing; older events would read as "Pushed 4 months ago".
const ACTIVITY_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000
const MAX_ACTIVITY = 3

type GitHubEvent = {
  id: string
  type: string
  repo: { name: string }
  created_at: string
  payload: {
    action?: string
    number?: number
    ref?: string
    ref_type?: string
    head?: string
    description?: string | null
    pull_request?: { title?: string; html_url?: string }
    release?: { tag_name?: string; name?: string | null; html_url?: string }
  }
}

function eventLink(event: GitHubEvent) {
  const { head, pull_request, release } = event.payload
  const repoUrl = `https://github.com/${event.repo.name}`
  if (event.type === 'PushEvent' && head) return `${repoUrl}/commit/${head}`
  return pull_request?.html_url ?? release?.html_url ?? repoUrl
}

function eventDetail(event: GitHubEvent) {
  const { ref, description, pull_request, release } = event.payload
  if (event.type === 'PushEvent' && ref) return `on ${ref.replace('refs/heads/', '')}`
  return pull_request?.title ?? release?.name ?? description ?? event.repo.name
}

// Phrases a public event for the hero phone's Dynamic Island, or null for noise (branches, deletes, stars, ...).
// PushEvent payloads no longer include commit counts, so pushes are just "Pushed to".
function describeEvent(event: GitHubEvent) {
  const { action, number, ref_type, release } = event.payload
  switch (event.type) {
    case 'PushEvent':
      return 'Pushed to'
    case 'PullRequestEvent':
      if (action === 'merged') return `Merged PR #${number} in`
      return action === 'opened' ? `Opened PR #${number} in` : null
    case 'CreateEvent':
      return ref_type === 'repository' ? 'Created' : null
    case 'PublicEvent':
      return 'Open-sourced'
    case 'ReleaseEvent':
      return action === 'published' ? `Released ${release?.tag_name ?? 'a build'} of` : null
    default:
      return null
  }
}

// Latest public GitHub activity, newest first, at most one entry per repo.
export async function fetchRecentActivity(): Promise<GitHubActivity[]> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=50`, {
      headers: GITHUB_API_HEADERS,
      next: { revalidate: 600 },
    })
    if (!res.ok) return []

    const events: GitHubEvent[] = await res.json()
    const cutoff = Date.now() - ACTIVITY_MAX_AGE_MS
    const seenRepos = new Set<string>()
    const activity: GitHubActivity[] = []

    // The feed is only roughly chronological, so sort before picking the newest per repo.
    events.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
    for (const event of events) {
      if (Date.parse(event.created_at) < cutoff) break
      const action = describeEvent(event)
      const repo = event.repo.name.split('/').pop() ?? event.repo.name
      if (!action || seenRepos.has(repo)) continue
      seenRepos.add(repo)
      activity.push({
        id: event.id,
        repo,
        action,
        detail: eventDetail(event),
        url: eventLink(event),
        createdAt: event.created_at,
      })
      if (activity.length === MAX_ACTIVITY) break
    }
    return activity
  } catch {
    return []
  }
}
