import type { RepoProvider } from "@/core/github/RepoProvider";
import type { GitHubRepo } from "@/core/github/types";

export class GitHubApiRepoProvider implements RepoProvider {
  async listUserRepos(username: string): Promise<GitHubRepo[]> {
    const url = new URL(`https://api.github.com/users/${username}/repos`);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("sort", "updated");

    const res = await fetch(url.toString(), {
      headers: {
        "Accept": "application/vnd.github+json"
      }
    });

    if (!res.ok) {
      // Fail gracefully — return empty list so the page still renders.
      return [];
    }

    const data = (await res.json()) as GitHubRepo[];
    return data;
  }
}
