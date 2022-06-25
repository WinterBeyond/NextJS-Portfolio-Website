import { ObjectId } from "mongodb";
import { updateOne } from "@/lib/api/database/updateOperations";

export const updateBlogPost = async (postId: string, update = {}) => {
	try {
		await updateOne("posts", { _id: new ObjectId(postId) }, update);
	} catch (error) {
		throw error;
	}
};

export default updateBlogPost;
