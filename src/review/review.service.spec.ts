import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReviewDocument, ReviewModel } from './review.model';

describe('ReviewService', () => {
	let service: ReviewService;
	let model: jest.Mocked<Model<ReviewDocument>>;

	const exec = { exec: jest.fn() };
	const reviewRepositoryFactory = (): Partial<
		Model<ReviewDocument>
	> => ({
		find: jest.fn().mockReturnValue(exec),
	});

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewService,
				{
					useFactory: reviewRepositoryFactory,
					provide: getModelToken(ReviewModel.name),
				},
			],
		}).compile();

		service = module.get<ReviewService>(ReviewService);
		model = module.get(getModelToken(ReviewModel.name));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('findByProductId working', async () => {
		const productId = new Types.ObjectId();

		(model.find as jest.Mock).mockReturnValueOnce([{ productId }]);

		const res = await service.findByProductId(
			productId.toHexString(),
		);
		expect(res[0].productId.toString()).toBe(productId.toString());
	});
});
