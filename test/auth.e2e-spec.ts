import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { ALREADY_REGISTERED_ERROR } from '../src/auth/auth.constants';

const testDto: AuthDto = {
	login: 'privalov.irk@gmail.com',
	password: '12345678',
};

describe('AppController (e2e)', () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleFixture: TestingModule =
			await Test.createTestingModule({
				imports: [AppModule],
			}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/register (POST) - already registered', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/auth/register')
			.send(testDto)
			.expect(400, {
				statusCode: 400,
				message: ALREADY_REGISTERED_ERROR,
				error: 'Bad Request',
			});
	});

	afterAll(() => disconnect());
});
