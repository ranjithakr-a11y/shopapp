import { Module } from '@nestjs/common';
import { OrderDetailService } from './order-details.service';
import { OrderDetailController } from './order-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailsModule { }
