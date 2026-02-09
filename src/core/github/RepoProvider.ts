import type { GitHubRepo } from "./types";

export interface RepoProvider {
  listUserRepos(username: string): Promise<GitHubRepo[]>;
}
