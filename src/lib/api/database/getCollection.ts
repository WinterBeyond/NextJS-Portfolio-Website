import databaseConnection from "@/lib/api/database/databaseConnection";

export const getCollection = async (collectionName: string) => {
	return (await databaseConnection()).collection(collectionName);
};

export default getCollection;
