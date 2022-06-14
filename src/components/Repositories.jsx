const Repositories = ({ repositories }) => {
	if (!repositories) return <>Could not retrieve respositories...</>;
	if (!repositories.length)
		return <>There are no respositories to display...</>;

	return (
		<section className="max-w-6xl mx-auto px-4 py-10 md:py-20">
			<p>There are {repositories.length} repositories</p>
		</section>
	);
};

export default Repositories;
