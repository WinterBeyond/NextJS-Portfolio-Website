import getCollection from "@/lib/api/database/getCollection";

export const updateOne = async (
	collectionName: string,
	filter = {},
	update = {}
) => {
	try {
		const collection = await getCollection(collectionName);
		await collection.updateOne(filter, update);
	} catch (error) {
		throw error;
	}
};

export const updateMany = async (
	collectionName: string,
	filter = {},
	update = {}
) => {
	try {
		const collection = await getCollection(collectionName);
		await collection.updateMany(filter, update);
	} catch (error) {
		throw error;
	}
};
