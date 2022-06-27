import type { NextApiRequest, NextApiResponse } from "next";

import getBlogPost from "@/lib/api/blog/getBlogPost";
import updateBlogPost from "@/lib/api/blog/updateBlogPost";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		if (req.method !== "POST")
			return res
				.status(405)
				.send({ message: "Only POST requests are allowed!" });

		const { postId } = req.body;
		if (!postId)
			return res.status(400).json({
				message: "The request is missing required data!",
			});

		const post = await getBlogPost(postId);
		if (!post)
			return res.status(404).json({
				message: "The post does not exist!",
			});

		await updateBlogPost(postId, { $inc: { views: 1 } });

		res.status(200).json({ message: "View registered" });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "The server is unable to handle your request right now!",
		});
	}
};

export default handler;
