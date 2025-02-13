import { Module } from '@nestjs/common';
import { UserModule } from './auth/user.module';
import { TopPageModule } from './top-page/top-page.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
		UserModule,
		TopPageModule,
		ProductModule,
		ReviewModule,
	],
})
export class AppModule {}
