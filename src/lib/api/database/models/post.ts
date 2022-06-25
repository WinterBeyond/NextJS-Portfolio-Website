import { Document } from "mongodb";

interface Post extends Document {
	_id: string;
	title: string;
	content: string;
	author: string;
	views: number;
	created: Date;
}

export default Post;
