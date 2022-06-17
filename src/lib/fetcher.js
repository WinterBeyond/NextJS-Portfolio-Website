export const fetcher = async (url, init = {}) => {
	try {
		const response = await fetch(url, init);

		let data;
		if (response.headers.get("Content-Type")?.includes("application/json"))
			data = await response.json();
		else data = response.body;

		if (!response.ok) throw new Error(data?.message ?? response.statusText);
		return data;
	} catch (error) {
		throw error;
	}
};

export default fetcher;
