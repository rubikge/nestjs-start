import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

@Schema()
export class ProductModel {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice: number;

	@Prop()
	credit: number;

	@Prop()
	calculatedRating: number;

	@Prop()
	description: number;

	@Prop()
	advantages: number;

	@Prop()
	disadvantages: number;

	@Prop({ type: () => [String] })
	categories: string[];

	@Prop({ type: () => [String] })
	tags: string[];

	@Prop({ type: () => [ProductCharacteristic], _id: false })
	characteristics: ProductCharacteristic[];

	createdAt: Date;
}

export const ProductSchema =
	SchemaFactory.createForClass(ProductModel);
