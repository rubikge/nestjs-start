import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDTO {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Min(1, { message: 'Less than 1!' })
	@Max(5)
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}
