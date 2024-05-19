import { ResourceNotFoundError } from 'libs/core/src/errors';
import { ProductRepository } from '../../repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { Either, failure, success } from 'libs/core/src/types';

interface EditProductUseCaseRequest {
  id: string;
  name: string;
  description: string;
  price: number;
}

type EditProductUseCaseResponse = Either<ResourceNotFoundError, object>;
@Injectable()
export class EditProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({
    id,
    name,
    description,
    price,
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      return failure(new ResourceNotFoundError('Product not found'));
    }

    product.name = name;
    product.description = description;
    product.price = price;

    await this.productRepository.save(product);

    return success({});
  }
}
