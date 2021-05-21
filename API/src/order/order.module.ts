import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { ProductService } from "src/product/product.service";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product])],
    controllers: [OrderController],
    providers: [OrderService,ProductService],
})
export class OrderModule {}
