import { BaseRepository } from "@enablers/core/repositories";
import { ProductEntity } from "../../enterprise/product.entity";

export abstract class ProductRepository extends BaseRepository<ProductEntity> {
  abstract findByName(name: string): Promise<ProductEntity | null>
}
