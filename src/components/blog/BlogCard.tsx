import Link from "next/link";

import Post from "@/lib/api/database/models/post";
import useTimeAgo from "@/hooks/useTimeAgo";

type BlogCardProps = {
	post: Post;
	isFirst: boolean;
	heading?: string;
};

const BlogCard = ({ post, isFirst = true, heading }: BlogCardProps) => {
	const timeAgo = useTimeAgo({ date: post.created });

	return (
		<>
			<div className="max-w-6xl flex justify-center mb-4">
				<div className="max-w-3xl">
					{isFirst && heading && (
						<h2 className="text-3xl md:text-4xl font-bold mb-2">{heading}</h2>
					)}
					<div className="border rounded-md bg-gray-50 dark:bg-zinc-900 hover:!bg-blue-500 hover:text-white group p-2 md:hover:scale-110 duration-700">
						<Link href={`/blog/post/${post._id}`}>
							<a>
								<h1 className="text-2xl md:text-4xl font-bold mx-4 my-2">
									{post.title}
								</h1>
								<p className="text-base text-justify mx-4">
									{post.content.split(".").slice(0, 3).join(".")}.
								</p>
								<p className="text-sm text-gray-400 group-hover:text-gray-200 mx-4 mt-2">
									Created {timeAgo} • {post.views} view
									{post.views === 1 ? "" : "s"}
								</p>
							</a>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogCard;
