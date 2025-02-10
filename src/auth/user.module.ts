import { Module } from '@nestjs/common';
import { UserController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../configs/jwt.config';

@Module({
	controllers: [UserController],
	imports: [
		MongooseModule.forFeature([
			{ name: UserModel.name, schema: UserSchema },
		]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
	],
	providers: [AuthService],
})
export class UserModule {}
