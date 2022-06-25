import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect } from "react";
import { ParsedUrlQuery } from "querystring";

import fetcher from "@/lib/fetcher";
import getBlogPosts from "@/lib/api/blog/getBlogPosts";
import getBlogPost from "@/lib/api/blog/getBlogPost";
import Post from "@/lib/api/database/models/post";

import Container from "@/components/Container";
import BlogPostContent from "@/components/blog/BlogPostContent";

type BlogPostProps = {
	post: Post;
};

interface IParams extends ParsedUrlQuery {
	slug: string;
}

const BlogPost = ({ post }: BlogPostProps) => {
	useEffect(() => {
		const abortController = new AbortController();

		const addView = async () => {
			try {
				await fetcher("/api/view", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						postId: post._id,
					}),
					signal: abortController.signal,
				});
			} catch (error) {
				// Ignore
			}
		};

		addView();

		return () => {
			abortController.abort();
		};
	}, [post._id]);

	return (
		<Container
			type="article"
			publishedTime={new Date(post.created).toISOString()}
			title={post.title}
			description={post.content}
		>
			<BlogPostContent post={post} />
		</Container>
	);
};

export default BlogPost;

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = (await getBlogPosts()) ?? [];
	const paths = posts.map((post) => ({
		params: {
			slug: `${post.title.toLowerCase().replaceAll(/\s/g, "-")}-${post._id}`,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params as IParams;

	const slugParts = slug.split("-");
	const postId = slugParts[slugParts.length - 1];
	const post: any = await getBlogPost(postId);
	if (!post)
		return {
			notFound: true,
		};

	post.created = post.created.toString();

	const url = `${process.env.NEXT_PUBLIC_DOMAIN}/blog/post/${slug}`;
	const canonicalUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/blog/post/${post.title
		.toLowerCase()
		.replaceAll(/\s/g, "-")}-${post._id}`;

	if (canonicalUrl !== url)
		return {
			redirect: {
				destination: canonicalUrl,
				permanent: false,
			},
		};

	return {
		props: { post },
		revalidate: 5,
	};
};
