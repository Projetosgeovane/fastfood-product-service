import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductsPresenter } from '../../presenters/products.presenter';
import { FetchProductUseCase } from 'src/modules/product/domain/application/use-cases/product/fetch-product.use-case';

@Controller('fprs')
export class FetchProductController {
  constructor(private readonly fetchProductUseCase: FetchProductUseCase) {}
  @Get('product/:productId')
  async handle(@Param('productId') id: string) {
    const result = await this.fetchProductUseCase.execute({ id });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const products = ProductsPresenter.toHTTP(result.value.product);

    return { products };
  }
}
