import { useEffect, useState } from "react";

import Post from "@/lib/api/database/models/post";

import BlogCard from "@/components/blog/BlogCard";
import ErrorCard from "@/components/cards/ErrorCard";

type BlogPostsProps = {
	posts?: Post[];
};

const BlogPosts = ({ posts }: BlogPostsProps) => {
	const [blogPosts, setBlogPosts] = useState<Post[]>();
	const [popularBlogPosts, setPopularBlogPosts] = useState<Post[]>();
	const [isLoading, setLoading] = useState<boolean>(true);
	const [hasError, setError] = useState<boolean>(true);

	useEffect(() => {
		if (!posts) {
			setError(true);
			setLoading(false);
			return;
		}

		setBlogPosts(
			posts.sort(
				(a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
			)
		);

		if (posts.length > 2)
			setPopularBlogPosts(posts.sort((a, b) => b.views - a.views).slice(0, 2));

		setError(posts.length === 0);
		setLoading(false);
	}, [posts]);

	return (
		<>
			<div className="max-w-6xl mx-auto">
				<h1 className="text-5xl md:text-9xl font-bold my-10 md:my-20 text-center md:text-left">
					Blog
				</h1>

				{!isLoading && (
					<div className="space-y-10">
						{!!popularBlogPosts?.length && (
							<div className="flex flex-col">
								{popularBlogPosts.map((post, index) => (
									<BlogCard
										key={`popular-post-${post._id}`}
										post={post}
										isFirst={index === 0}
										heading="Popular Posts"
									/>
								))}
							</div>
						)}

						{!!blogPosts?.length && (
							<div className="flex flex-col">
								{blogPosts.map((post, index) => (
									<BlogCard
										key={`post-${post._id}`}
										post={post}
										isFirst={index === 0}
										heading="All Posts"
									/>
								))}
							</div>
						)}

						{hasError && <ErrorCard message="There are no posts!" />}
					</div>
				)}
			</div>
		</>
	);
};

export default BlogPosts;
