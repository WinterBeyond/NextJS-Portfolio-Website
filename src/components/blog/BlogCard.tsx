import { useEffect, useState } from "react";
import Link from "next/link";

import Post from "@/lib/api/database/models/post";

type BlogCardProps = {
	post: Post;
	isFirst: boolean;
	heading?: string;
};

const BlogCard = ({ post, isFirst = true, heading }: BlogCardProps) => {
	const [timeAgo, setTimeAgo] = useState<string>("");

	useEffect(() => {
		const getTimeAgo = (currentDate: Date) => {
			const millisecondDifference = Date.now() - currentDate.getTime();
			const secondDifference = Math.floor(millisecondDifference / 1000);
			const minutesDifference = Math.floor(secondDifference / 60);
			const hoursDifference = Math.floor(minutesDifference / 60);
			const daysDifference = Math.floor(hoursDifference / 24);
			const monthsDifference = Math.floor(daysDifference / 31);

			let text = "Never";

			if (secondDifference < 6) text = "A few moments ago";
			else if (secondDifference < 60)
				text = `${secondDifference} second${
					secondDifference > 1 ? "s" : ""
				} ago`;
			else if (minutesDifference < 60)
				text = `${minutesDifference} minute${
					minutesDifference > 1 ? "s" : ""
				} ago`;
			else if (hoursDifference < 24)
				text = `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
			else if (daysDifference < 31)
				text = `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
			else if (monthsDifference > 0)
				text = `${monthsDifference} month${
					monthsDifference > 1 ? "s" : ""
				} ago`;

			return text;
		};

		const timeInterval = setInterval(() => {
			setTimeAgo(getTimeAgo(new Date(post.created)));
		}, 1000);

		return () => {
			clearInterval(timeInterval);
		};
	}, [post.created]);

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
									Created{" "}
									{timeAgo ? (
										timeAgo
									) : (
										<span className="line-through">----------</span>
									)}{" "}
									• {post.views} view{post.views === 1 ? "" : "s"}
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
