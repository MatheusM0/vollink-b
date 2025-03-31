import { Controller, Post, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async submitReview(@Body() body: { userId: number; rating: number; comment: string }) {
    return this.reviewsService.submitReview(body.userId, body.rating, body.comment);
  }
}
