import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../../repositories/product.repository";
import { ProductEntity } from "../../../enterprise/product.entity";
import { Either, failure, success } from "@enablers/core/types";

interface FetchProductByIdUseCaseRequest {
  id: string;
}

type FetchProductByIdUseCaseResponse = Either<
  null,
  {
    product: ProductEntity;
  }
>;
@Injectable()
export class FetchProductUseCase {
  constructor(private readonly productRepository: ProductRepository) { }

  async execute({id}: FetchProductByIdUseCaseRequest): Promise<FetchProductByIdUseCaseResponse> {
    const product = await this.productRepository.findById(id);

    if(!product) {
      return failure(null);
    }

    return success({ product });
  }
}
