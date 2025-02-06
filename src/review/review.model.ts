import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { ProductModel } from '../product/product.model';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema()
export class ReviewModel {
	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	title: string;

	@Prop()
	description: string;

	@Prop({ required: true })
	rating: number;

	@Prop({ type: SchemaTypes.ObjectId, ref: ProductModel.name })
	productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
