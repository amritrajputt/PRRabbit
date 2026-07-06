import { infiniteQueryOptions } from "@tanstack/react-query";
import { GithubRepo } from "../server/repos";

type GithubReposPage = {
    repos: GithubRepo[];
    totalCount: number;
    page: number;
    hasMore: boolean;
}
export const githubRepoKeys = {
    all: ["github", "repos"] as const
}

const REPOS_STALE_TIME = 10 * 60 * 1000; // 10 minutes

export const gitHubReposInfiniteQuery = infiniteQueryOptions({
    queryKey: [...githubRepoKeys.all, "list"],
    queryFn: async ({ pageParam = 1 }) => {
        const response = await fetch(`/api/github/repo?page=${pageParam}`)

        if (!response.ok) {
            throw new Error(`Failed to fetch repos: ${response.statusText}`)
        }

        const data = await response.json();
        return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
        return lastPage.hasMore ? lastPage.page + 1 : undefined;

    },
staleTime:REPOS_STALE_TIME
})