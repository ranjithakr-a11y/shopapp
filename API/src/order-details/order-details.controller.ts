import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from "@nestjs/common";
import { OrderDetailService } from "./order-details.service";
import { CreateOrderDetailDto } from "./dto/create-order-detail.dto";
import { UpdateOrderDetailDto } from "./dto/update-order-detail.dto";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller("order-detail")
@UseGuards(JwtAuthGuard)
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  create(
      @Request() req: any,
      @Body() createOrderDetailDto: CreateOrderDetailDto
  ) {
      return this.orderDetailService.create(
          createOrderDetailDto,
          req.user.userId
      );
  }

  @Get()
  findAll() {
      return this.orderDetailService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
      return this.orderDetailService.findOne(+id);
  }

  @Patch(":id")
  update(
      @Param("id") id: string,
      @Body() updateOrderDetailDto: UpdateOrderDetailDto
  ) {
      return this.orderDetailService.update(+id, updateOrderDetailDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
      return this.orderDetailService.remove(+id);
  }
}