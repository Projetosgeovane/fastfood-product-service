import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { EditProductUseCase } from 'src/modules/product/domain/application/use-cases/product/edit-product.use-case';
import { EditProductDTO } from '../../dtos/edit-product.dto';

@Controller()
export class EditProductController {
  constructor(private readonly editProductUseCase: EditProductUseCase) {}

  @Put('product/:productId')
  async handle(@Param('productId') id: string, @Body() body: EditProductDTO) {
    const { name, description, price } = body;

    const result = await this.editProductUseCase.execute({
      id,
      name,
      description,
      price,
    });

    if (result.isFailure()) {
      const error = result.value;

      switch (error.constructor) {
        case Error:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequestException();
      }
    }
  }
}
