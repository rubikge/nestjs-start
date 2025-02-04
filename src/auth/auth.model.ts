import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthModel>;

@Schema()
export class AuthModel {
	@Prop({ required: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
