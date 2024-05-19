import { Module } from '@nestjs/common';
import { ProductRepository } from '../../application/repositories/product.repository';
import { DatabaseModule } from '../../../../../common/database/database.module';
import { PrismaProductRepositoryImpl } from './prisma/repositories/prisma-product.repository.impl';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      useClass: PrismaProductRepositoryImpl,
      provide: ProductRepository,
    },
  ],

  exports: [ProductRepository],
})
export class PersistenceModule {}
