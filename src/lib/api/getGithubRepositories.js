import fetcher from "@/lib/fetcher";

export const getGithubRepositories = async (
	username,
	includePrivate = false
) => {
	try {
		const accessToken = process.env.GITHUB_ACCESS_TOKEN;
		if (!username) throw new Error("Missing username");

		const body = accessToken
			? {
					headers: {
						Authorization: `token ${accessToken}`,
					},
			  }
			: {};

		const repositories = (
			await fetcher(
				`https://api.github.com/search/repositories?q=user:${username}+sort:author-date-asc`,
				body
			)
		).items
			.filter((repo) => includePrivate || !repo.private)
			.splice(0, 6);

		return await Promise.all(
			repositories.map(async (repo) => {
				const commits = await fetcher(
					`https://api.github.com/repos/WinterBeyond/${repo.name}/commits`,
					body
				);

				const commit = commits?.[0];
				if (!commit) return repo;

				return { ...repo, lastCommit: commit.commit };
			})
		);
	} catch (error) {
		return null;
	}
};

export default getGithubRepositories;
