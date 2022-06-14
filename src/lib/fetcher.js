export const fetcher = async (url, init = {}) => {
	try {
		const response = await fetch(url, init);
		const data = await response.json();

		if (!response.ok) throw new Error(data?.message ?? response.statusText);
		return data;
	} catch (error) {
		throw error;
	}
};

export default fetcher;
