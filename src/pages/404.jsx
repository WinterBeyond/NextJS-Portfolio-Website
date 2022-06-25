import Container from "@/components/Container";
import ErrorCard from "@/components/cards/ErrorCard";

const NotFound = () => {
	return (
		<Container>
			<section className="max-w-6xl mx-auto flex justify-center">
				<ErrorCard message="Resource Not Found" />
			</section>
		</Container>
	);
};

export default NotFound;
