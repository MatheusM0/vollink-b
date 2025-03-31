import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KafkaProducerService } from '../kafka/kafka.producer';
import { Review } from './reviews.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewsRepository: Repository<Review>,
    private readonly kafkaProducer: KafkaProducerService,
  ) {}

  async submitReview(userId: number, rating: number, comment: string) {
    const review = this.reviewsRepository.create({ userId, rating, comment });
    await this.reviewsRepository.save(review);

    // Enviar evento para o Kafka
    await this.kafkaProducer.sendMessage('review.received', review);

    return review;
  }
}
