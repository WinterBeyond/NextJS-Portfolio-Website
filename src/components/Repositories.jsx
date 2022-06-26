import GithubCard from "@/components/cards/GithubCard";
import GithubIcon from "@/components/icons/GithubIcon";
import ErrorCard from "@/components/cards/ErrorCard";

const Repositories = ({ repositories }) => {
	return (
		<section className="max-w-6xl mx-auto px-4 py-5 my-44 rounded-lg bg-white dark:bg-transparent">
			<div className="flex flex-col md:flex-row justify-between items-center md:pt-20 mx-10">
				<h1 className="text-3xl md:text-6xl lg:text-9xl max-w-lg font-bold my-6 md:my-0 text-gray-400 md:text-gray-200 dark:text-gray-700 text-center lg:text-left">
					Code Repositories
				</h1>

				<GithubIcon className="flex flex-row mb-10 px-8 py-4 rounded-md bg-gray-200 dark:bg-gray-900 hover:bg-gray-300 hover:dark:bg-gray-800 shadow-lg text-xl space-x-2 items-center">
					<p>View GitHub</p>
				</GithubIcon>
			</div>

			{/* Empty or null repository data */}
			{!repositories?.length > 0 && (
				<ErrorCard
					message={
						!repositories
							? "Could not retrieve respositories..."
							: "There are no respositories to display..."
					}
				/>
			)}

			{repositories?.length > 0 && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-10 lg:-mt-10 gap-y-20">
					{repositories.map((repository) => (
						<GithubCard
							repository={repository}
							key={`repository-${repository.id}`}
						/>
					))}
				</div>
			)}
		</section>
	);
};

export default Repositories;
