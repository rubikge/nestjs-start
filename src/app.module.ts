import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { getMongoString } from './configs/mongo.config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => {
				const mongoString = getMongoString(configService);
				return { uri: mongoString };
			},
			inject: [ConfigService],
		}),
		AuthModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
		UserModule,
	],
})
export class AppModule {}
