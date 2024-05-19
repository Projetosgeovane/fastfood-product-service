import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';
import { CreateProductDTO } from '../../dtos/create-product.dto';
import { CreateProductUseCase } from 'src/modules/product/domain/application/use-cases/product/create-product.use-case';

@Controller('product')
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async handle(@Body() body: CreateProductDTO) {
    const { name, description, price } = body;

    const result = await this.createProductUseCase.execute({
      name,
      description,
      price,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case Error: {
          throw new ConflictException(error.message);
        }
        default: {
          throw new BadRequestException();
        }
      }
    }
  }
}
