export const getBlogPost = async (postId) => {
	try {
		if (postId == 1 || postId == 2) return { id: postId };
		throw new Error("Post does not exist");
	} catch {
		return null;
	}
};

export default getBlogPost;
