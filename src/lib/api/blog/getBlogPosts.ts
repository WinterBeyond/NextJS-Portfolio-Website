import { fetchAll } from "@/lib/api/database/fetchOperations";
import Post from "@/lib/api/database/models/post";

export const getBlogPosts = async () => {
	try {
		return await fetchAll<Post>("posts");
	} catch {
		return null;
	}
};

export default getBlogPosts;
