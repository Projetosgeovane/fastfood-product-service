import { Module } from "@nestjs/common";
import { CreateProductController } from "./controllers/product/create-product.controller.";
import { PersistenceModule } from "../persistence/persistence.module";
import { FetchProductsController } from "./controllers/product/fetch-products.controller";
import { EditProductController } from "./controllers/product/edit-product.controler";
import { FetchProductController } from "./controllers/product/fetch-product.controller";
import { CreateProductUseCase } from "../../application/use-cases/product/create-product.use-case";
import { FetchProductUseCase } from "../../application/use-cases/product/fetch-product.use-case";
import { EditProductUseCase } from "../../application/use-cases/product/edit-product.use-case";
import { FetchProductsUseCase } from "../../application/use-cases/product/fetch-products.use-case";

@Module({
  imports: [PersistenceModule],
  controllers: [CreateProductController, FetchProductsController, FetchProductController, EditProductController],
  providers: [CreateProductUseCase, FetchProductsUseCase, FetchProductUseCase, EditProductUseCase]
})

export class HttpModule { }
