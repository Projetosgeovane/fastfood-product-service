import { ProductEntity } from "../../../enterprise/product.entity";

export class ProductsPresenter {
  static toHTTP(product: ProductEntity) {
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
