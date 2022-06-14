import Container from "@/components/Container";
import BlogPosts from "@/components/blog/BlogPosts";
import getBlogPosts from "@/lib/api/blog/getBlogPosts";

const Blog = ({ posts }) => {
	return (
		<Container>
			<BlogPosts posts={posts} />
		</Container>
	);
};

export default Blog;

export const getStaticProps = async () => {
	const posts = await getBlogPosts();
	return {
		props: { posts },
		revalidate: 10,
	};
};
