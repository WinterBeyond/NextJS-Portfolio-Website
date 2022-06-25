import { useEffect, useState } from "react";

import Post from "@/lib/api/database/models/post";

type BlogPostContentProps = {
	post: Post;
};

const BlogPostContent = ({ post }: BlogPostContentProps) => {
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
			<div className="max-w-6xl mx-auto">
				<h1 className="text-3xl font-bold">{post.title}</h1>
				<p className="text-sm text-gray-400">
					Created{" "}
					{timeAgo ? timeAgo : <span className="line-through">----------</span>}{" "}
					• {post.views} view{post.views === 1 ? "" : "s"}
				</p>
				<p className="text-base mt-6">{post.content}</p>
			</div>
		</>
	);
};

export default BlogPostContent;
