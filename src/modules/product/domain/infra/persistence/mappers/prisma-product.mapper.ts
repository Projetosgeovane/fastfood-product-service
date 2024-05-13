import { Prisma, Product as PrismaProduct } from "@prisma/client";
import { ProductEntity } from "../../../enterprise/product.entity";
import { UniqueEntityID } from "@enablers/core/entities";

export class PrismaProductMapper {
  static toDomain(raw: PrismaProduct): ProductEntity {
    const product = ProductEntity.instance(
      {
        name: raw.name,
        description: raw.description,
        price: raw.price,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      },
      new UniqueEntityID(raw.id),
    );

    return product;
  }

  static toPrisma(
    product: ProductEntity,
  ): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id.toValue(),
      name: product.name,
      description: product.description,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
    };
  }
}
