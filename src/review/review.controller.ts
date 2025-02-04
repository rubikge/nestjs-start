import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { Types } from 'mongoose';
import { REVIEW_NOT_FOUND } from './review.constants';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post('create')
	async create(@Body() dto: CreateReviewDTO) {
		await this.reviewService.create(dto);
	}

	@Get('byProduct/:productId')
	async get(@Param('productId') productId: Types.ObjectId) {
		return await this.reviewService.findByProductId(productId);
	}

	@Delete(':id')
	async delete(@Param('id') id: Types.ObjectId) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Delete('byProduct/:productId')
	async deleteByProductId(@Param('productId') productId: Types.ObjectId) {
		await this.reviewService.deleteByProductId(productId);
	}
}
