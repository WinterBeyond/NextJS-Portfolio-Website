export const getBlogPosts = async () => {
	try {
		return [{ id: 1 }, { id: 2 }];
	} catch {
		return null;
	}
};

export default getBlogPosts;
