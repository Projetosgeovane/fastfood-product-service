import { Either, success } from '@enablers/core/types';
import { ProductEntity } from '../../../enterprise/product.entity';
import { ProductRepository } from '../../repositories/product.repository';
import { Injectable } from '@nestjs/common';

interface FetchProductsUseCaseRequest {
  page: number;
}

type FetchProductsUseCaseResponse = Either<null, { products: ProductEntity[] }>;
@Injectable()
export class FetchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    page,
  }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productRepository.findManyRecent({ page });

    return success({ products });
  }
}
