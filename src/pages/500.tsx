import Container from "@/components/Container";
import ErrorCard from "@/components/cards/ErrorCard";

const InternalError = () => {
	return (
		<Container>
			<section className="max-w-6xl mx-auto flex justify-center">
				<ErrorCard message="Internal Server Error" />
			</section>
		</Container>
	);
};

export default InternalError;
