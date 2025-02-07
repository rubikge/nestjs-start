import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDTO } from '../src/review/dto/create-review.dto';
import { disconnect, Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId();

const testDto: CreateReviewDTO = {
	name: 'Test',
	title: 'Title',
	description: 'Desc',
	rating: 4,
	productId: productId.toHexString(),
};

describe('AppController (e2e)', () => {
	let app: INestApplication<App>;
	let createdId: Types.ObjectId;

	beforeEach(async () => {
		const moduleFixture: TestingModule =
			await Test.createTestingModule({
				imports: [AppModule],
			}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201);

		createdId = body._id;
		expect(createdId).toBeDefined();
	});

	it('/review/create (POST) - fail', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/review/create')
			.send({ ...testDto, rating: 0 })
			.expect(400);
		console.log(body);
	});

	it('/review/byProduct/:productId (GET) - success', () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(1);
			});
	});

	it('/review/byProduct/:productId (GET) - fail', () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId())
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND,
			});
	});
	afterAll(() => disconnect());
});
