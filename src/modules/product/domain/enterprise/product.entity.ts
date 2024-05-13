import { Optional } from "@enablers/core/types";
import { Entity, UniqueEntityID } from "../../../../../libs/core/src/entities";

interface ProductEntityProps {
  name: string;
  description: string;
  price: number;

  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export class ProductEntity extends Entity<ProductEntityProps> {
  static instance(
    props: Optional<ProductEntityProps, | 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const product = new ProductEntity(
      {
        name: props.name ?? null,
        description: props.description ?? null,
        price: props.price ?? null,
        createdAt: new Date(),
        updatedAt: props.updatedAt ?? null,
        deletedAt: props.deletedAt ?? null,
        ...props,
      },
      id,
    );

    return product;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  get price() {
    return this.props.price;
  }


  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  set name(value: string) {
    this.props.name = value;
  }

  set description(value: string) {
    this.props.description = value;
  }

  set price(value: number) {
    this.props.price = value;
  }

}
