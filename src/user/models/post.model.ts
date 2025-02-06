import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from './user.model';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	text: string;

	@Prop({ type: SchemaTypes.ObjectId, ref: User.name })
	author: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
