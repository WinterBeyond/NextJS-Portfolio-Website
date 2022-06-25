import getCollection from "@/lib/api/database/getCollection";

export const fetchOne = async <T>(
	collectionName: string,
	filter = {}
): Promise<T> => {
	const collection = await getCollection(collectionName);
	const document: any = await collection.findOne<T>(filter);
	if (!document) throw Error("Document does not exist");
	return { ...document, _id: document._id.toString() };
};

export const fetchAll = async <T>(
	collectionName: string,
	filter = {}
): Promise<T[]> => {
	const collection = await getCollection(collectionName);
	const documents = await collection.find<T>(filter).toArray();
	return [...documents].map((document: any) => {
		return { ...document, _id: document._id.toString() } as T;
	});
};
