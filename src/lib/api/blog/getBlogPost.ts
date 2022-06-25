import { ObjectId } from "mongodb";
import { fetchOne } from "@/lib/api/database/fetchOperations";
import Post from "@/lib/api/database/models/post";

export const getBlogPost = async (postId: string) => {
	try {
		return await fetchOne<Post>("posts", { _id: new ObjectId(postId) });
	} catch {
		return null;
	}
};

export default getBlogPost;
