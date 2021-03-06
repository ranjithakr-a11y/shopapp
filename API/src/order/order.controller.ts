import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller("order")
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Request() req: any, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto, req.user.userId);
  }

  // @Get()
  // findAll() {
  //     return this.orderService.findAll();
  // }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //     return this.orderService.remove(+id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  getOrder(@Request() req: any) {
    // user : userId, email : from JwtStrategy
    return this.orderService.findById(req.user.userId);
  }
}