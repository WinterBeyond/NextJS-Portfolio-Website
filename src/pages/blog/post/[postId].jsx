import Container from "@/components/Container";
import getBlogPosts from "@/lib/api/blog/getBlogPosts";
import getBlogPost from "@/lib/api/blog/getBlogPost";

const BlogPost = ({ post }) => {
	return <Container>{JSON.stringify(post)}</Container>;
};

export default BlogPost;

export const getStaticPaths = async () => {
	const posts = (await getBlogPosts()) ?? [];
	const paths = posts.map((post) => ({
		params: { postId: post.id.toString() },
	}));

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async ({ params }) => {
	const { postId } = params;
	const post = await getBlogPost(postId);
	if (!post)
		return {
			notFound: true,
		};

	return {
		props: { post },
		revalidate: 5,
	};
};
