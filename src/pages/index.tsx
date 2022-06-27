import getGithubRepositories from "@/lib/api/getGithubRepositories";
import constants from "@/constants/index";

import Container from "@/components/Container";
import Hero from "@/components/Hero";
import CurrentProjects from "@/components/project/CurrentProjects";
import Repositories from "@/components/Repositories";

type IndexProps = {
	repositories: any[] | null;
};

const Index = ({ repositories }: IndexProps) => {
	return (
		<Container>
			<Hero />
			<CurrentProjects />
			<Repositories repositories={repositories} />
		</Container>
	);
};

export const getStaticProps = async () => {
	const repositories = await getGithubRepositories(constants.username);
	return {
		props: { repositories },
		revalidate: 60,
	};
};

export default Index;
