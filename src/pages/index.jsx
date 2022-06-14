import getGithubRepositories from "@/lib/api/getGithubRepositories";

import Container from "@/components/Container";
import Hero from "@/components/Hero";
import Repositories from "@/components/Repositories";

const Index = ({ repositories }) => {
	return (
		<Container>
			<Hero />
			<Repositories repositories={repositories} />
		</Container>
	);
};

export const getServerSideProps = async () => {
	const username = "WinterBeyond";
	const repositories = await getGithubRepositories(username, true);

	return {
		props: {
			repositories,
		},
	};
};

export default Index;
