import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, ReviewModel } from './review.model';
import { DeleteResult, Model, Types } from 'mongoose';
import { CreateReviewDTO } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel.name)
		private reviewModel: Model<ReviewDocument>,
	) {}

	async create(dto: CreateReviewDTO): Promise<ReviewDocument> {
		if (!Types.ObjectId.isValid(dto.productId)) {
			throw new BadRequestException('Invalid productId format');
		}

		const newReview = new this.reviewModel({
			...dto,
			productId: new Types.ObjectId(dto.productId),
		});
		return newReview.save();
	}

	async delete(id: string): Promise<ReviewDocument | null> {
		if (!Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid id format');
		}

		return this.reviewModel.findByIdAndDelete(new Types.ObjectId(id));
	}

	async findByProductId(
		productId: string,
	): Promise<ReviewDocument[]> {
		if (!Types.ObjectId.isValid(productId)) {
			throw new BadRequestException('Invalid productId format');
		}

		return this.reviewModel.find({
			productId: new Types.ObjectId(productId),
		});
	}

	async deleteByProductId(productId: string): Promise<DeleteResult> {
		if (!Types.ObjectId.isValid(productId)) {
			throw new BadRequestException('Invalid productId format');
		}

		return this.reviewModel.deleteMany({
			productId: new Types.ObjectId(productId),
		});
	}
}
