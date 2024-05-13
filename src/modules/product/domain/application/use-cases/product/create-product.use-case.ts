import { ResourceExistsError } from "@enablers/core/errors";
import { ProductEntity } from "../../../enterprise/product.entity";
import { ProductRepository } from "../../repositories/product.repository";
import { Injectable } from "@nestjs/common";
import { Either, failure, success } from "@enablers/core/types";
interface ProductRequest {
  name: string;
  description: string;
  price: number;
}

type ProductResponse = Either<ResourceExistsError, object>;
@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) { }

  async execute({
    name,
    description,
    price,
  }: ProductRequest): Promise<ProductResponse> {

    const productAlreadyExists = await this.productRepository.findByName(name);

    if (productAlreadyExists) {
      return failure(new ResourceExistsError('Name already exists'));
    }

    const product = ProductEntity.instance({
      name,
      description,
      price,
    });

    await this.productRepository.create(product);

    return success({});
  }
}
