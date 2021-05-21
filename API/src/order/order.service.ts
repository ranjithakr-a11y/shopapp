import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/auth/user/user.service";
import { ProductService } from "src/product/product.service";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UserService,
    private productService: ProductService
  ) { }

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const user = await this.userService.findById(userId);
    return this.orderRepository.save({
      totalAmount: createOrderDto.totalAmount,
      orderDate: createOrderDto.orderDate,
      shoppingDate: createOrderDto.shoppingDate,
      products: createOrderDto.products,
      user: user,
    });
  }

  findAll() {
    return this.orderRepository.find({ relations: ["user", "address"] });
  }

  async findOne(id: number) {
    return this.orderRepository.findOne(id).then((data) => {
      if (!data) throw new NotFoundException(); //throw new HttpException({}, 204);
      return data;
    });
    // const a = await getRepository(UserEntity)
    //     .createQueryBuilder("user")
    //     .from(this.userRepo, "user")
    //     .where("UserService.userId =:id");
    // const a = await UserService.fi(id)
    // console.log(a);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return this.orderRepository.update(
      { orderId: id },
      {
        isCancelled: updateOrderDto.isCancelled,
      }
    );
  }

  //     remove(id: number) {
  //         return `This action removes a #${id} order`;
  //     }

  async findById(id: string) {
    return this.orderRepository.find({
      where: { user: id },
      relations: ["user", "address"],
    });
  }
}