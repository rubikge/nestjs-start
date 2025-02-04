import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDocument, ReviewModel } from './review.model';
import { DeleteResult, Model, Types } from 'mongoose';
import { CreateReviewDTO } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>) {}

	async create(dto: CreateReviewDTO): Promise<ReviewDocument> {
		const newReview = new this.reviewModel(dto);
		return newReview.save();
	}

	async delete(id: Types.ObjectId): Promise<ReviewDocument | null> {
		return this.reviewModel.findByIdAndDelete(id);
	}

	async findByProductId(productId: Types.ObjectId): Promise<ReviewDocument[]> {
		return this.reviewModel.find({ productId });
	}

	async deleteByProductId(productId: Types.ObjectId): Promise<DeleteResult> {
		return this.reviewModel.deleteMany({ productId });
	}
}
