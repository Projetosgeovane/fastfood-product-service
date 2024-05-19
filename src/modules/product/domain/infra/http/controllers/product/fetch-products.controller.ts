import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductsPresenter } from '../../presenters/products.presenter';
import { FetchProductsUseCase } from 'src/modules/product/domain/application/use-cases/product/fetch-products.use-case';

@Controller('product')
export class FetchProductsController {
  constructor(private readonly fetchProductsUseCase: FetchProductsUseCase) {}

  @Get()
  async handle(@Query('page', ParseIntPipe) page: number) {
    const result = await this.fetchProductsUseCase.execute({ page });

    if (result.isFailure()) {
      throw new BadRequestException();
    }

    const products = result.value.products.map(ProductsPresenter.toHTTP);

    return { products };
  }
}
