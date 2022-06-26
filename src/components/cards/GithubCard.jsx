import useTimeAgo from "@/hooks/useTimeAgo";

const GithubCard = ({ repository }) => {
	const timeAgo = useTimeAgo({ date: repository.lastCommit.author.date });

	return (
		<div className="github-repository">
			<h2 className="font-semibold text-xl dark:text-gray-200 text-gray-700">
				{repository.name.replace(/_|-/g, " ")}
			</h2>
			<p className="text-sm text-gray-500">Last Commit {timeAgo}</p>
			<p className="text-base my-4 text-gray-400">
				{repository.description || "No Description :("}
			</p>
			<a
				href={repository.clone_url}
				target="_blank"
				rel="noopener noreferrer"
				className="font-semibold group flex flex-row space-x-2 w-full items-center"
			>
				<p>View Repository</p>
				<div className="transform group-hover:translate-x-2 transition duration-300">
					&rarr;
				</div>
			</a>
		</div>
	);
};

export default GithubCard;
