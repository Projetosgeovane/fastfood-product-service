import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/modules/product/domain/application/repositories/product.repository';
import { ProductEntity } from 'src/modules/product/domain/enterprise/product.entity';
import { PrismaProductMapper } from '../../mappers/prisma-product.mapper';
import { PrismaService } from '../../../../../../../common/database/prisma/prisma.service';
import { PaginationParams } from '@enablers/core/repositories';

@Injectable()
export class PrismaProductRepositoryImpl implements ProductRepository {
  private readonly PERPAGE = 20;
  constructor(private readonly prisma: PrismaService) {}

  async findByName(name: string): Promise<ProductEntity | null> {
    const product = await this.prisma.product.findFirst({
      where: {
        name,
      },
    });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }

  async create(data: ProductEntity): Promise<void> {
    const product = PrismaProductMapper.toPrisma(data);

    await this.prisma.product.create({
      data: {
        ...product,
      },
    });
  }

  async save(body: ProductEntity): Promise<void> {
    const product = PrismaProductMapper.toPrisma(body);

    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        ...product,
      },
    });
  }

  async findManyRecent({ page }: PaginationParams): Promise<ProductEntity[]> {
    const product = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: this.PERPAGE,
      skip: (page - 1) * this.PERPAGE,
    });

    return product.map(PrismaProductMapper.toDomain);
  }

  async findById(id: string): Promise<ProductEntity> {
    const product = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  softDelete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
