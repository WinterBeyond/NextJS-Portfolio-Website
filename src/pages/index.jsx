import getGithubRepositories from "@/lib/api/getGithubRepositories";
import constants from "@/constants/index";

import Container from "@/components/Container";
import Hero from "@/components/Hero";
import CurrentProjects from "@/components/project/CurrentProjects";
import Repositories from "@/components/Repositories";

const Index = ({ repositories }) => {
	return (
		<Container>
			<Hero />
			<CurrentProjects />
			<Repositories repositories={repositories} />
		</Container>
	);
};

export const getServerSideProps = async () => {
	const repositories = await getGithubRepositories(constants.username);

	return {
		props: {
			repositories,
		},
	};
};

export default Index;
