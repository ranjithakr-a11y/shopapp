import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { OrderDetailsModule } from './order-details/order-details.module';

@Module({
  imports: [
    // register the modules : features
    TypeOrmModule.forRoot(),
    ProductModule,
    AuthModule,
    AddressModule,
    OrderModule,
    PaymentModule,
    OrderDetailsModule,
    

  ],
  controllers: [
    // register the controller
    AppController,
  ],
  providers: [
    // register the services
    AppService,
  ],
})
export class AppModule { }
