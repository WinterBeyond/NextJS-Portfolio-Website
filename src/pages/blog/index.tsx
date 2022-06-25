import { GetStaticProps } from "next";

import BlogPosts from "@/components/blog/BlogPosts";
import getBlogPosts from "@/lib/api/blog/getBlogPosts";
import Post from "@/lib/api/database/models/post";

import Container from "@/components/Container";

type BlogProps = {
	posts: Post[];
};

const Blog = ({ posts }: BlogProps) => {
	return (
		<Container>
			<BlogPosts posts={posts} />
		</Container>
	);
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
	const posts = (await getBlogPosts())?.map((post) => ({
		...post,
		created: post.created.toString(),
	}));

	return {
		props: { posts },
		revalidate: 10,
	};
};
