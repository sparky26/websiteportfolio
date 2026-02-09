import type { RepoProvider } from "@/core/github/RepoProvider";
import type { GitHubRepo } from "@/core/github/types";

export async function getFeaturedRepos(
  provider: RepoProvider,
  username: string,
  featuredRepoNames: readonly string[]
): Promise<{ featured: GitHubRepo[]; recent: GitHubRepo[] }> {
  let repos: GitHubRepo[] = [];

  try {
    repos = await provider.listUserRepos(username);
  } catch {
    return { featured: [], recent: [] };
  }

  const byName = new Map(repos.map(r => [r.name, r]));
  const featured = featuredRepoNames
    .map(name => byName.get(name))
    .filter(Boolean) as GitHubRepo[];

  const featuredSet = new Set(featuredRepoNames);

  const recent = repos
    .filter(r => !r.fork && !r.archived)
    .filter(r => !featuredSet.has(r.name))
    .slice(0, 6);

  return { featured, recent };
}
