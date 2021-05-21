import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/auth/user/user.service";
import { Repository } from "typeorm";
import { CreateOrderDetailDto } from "./dto/create-order-detail.dto";
import { UpdateOrderDetailDto } from "./dto/update-order-detail.dto";
import { OrderDetail } from "./entities/order-detail.entity";

@Injectable()
export class OrderDetailService {
    constructor(
        @InjectRepository(OrderDetail)
        private orderDetailRepository: Repository<OrderDetail>,
        private userService: UserService
    ) {}
    async create(createOrderDetailDto: CreateOrderDetailDto, userId: string) {
        const user = await this.userService.findById(userId);

        let [data, count] = await this.orderDetailRepository.findAndCount();
        console.log(data);
        console.log(count);
        return this.orderDetailRepository.save({
            orderAmount: createOrderDetailDto.orderAmount,
            orderQty: createOrderDetailDto.orderQty,
            orderId: count + 1,
            paymentId: count + 1,
            address: count + 1,
            user: user,
        });
    }

    findAll() {
        return this.orderDetailRepository.find({
            relations: ["user", "orderId", "payment", "address"],
        });
    }

    findOne(id: number) {
        return this.orderDetailRepository.findOne(id).then((data) => {
            if (!data) throw new NotFoundException(); //throw new HttpException({}, 204);
            return data;
        });
    }

    update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
        return this.orderDetailRepository.update(
            { orderDetailId: id },
            {
                orderAmount: updateOrderDetailDto.orderAmount,
                orderQty: updateOrderDetailDto.orderQty,
            }
        );
    }

    remove(id: number) {
        return this.orderDetailRepository.delete(id);
    }
}