import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/auth/user/user.service";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./entities/payment.entity";

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
        private userService: UserService
    ) {}

    async create(createPaymentDto: CreatePaymentDto, userId: string) {
        const user = await this.userService.findById(userId);

        let [data, count] = await this.paymentRepository.findAndCount();
        console.log(data);
        console.log(count);
        return this.paymentRepository.save({
            amountPaid: createPaymentDto.amountPaid,
            paymentMethod: createPaymentDto.paymentMethod,
            paymentType: createPaymentDto.paymentType,
            orderId: count + 1,
            user: user,
        });
    }

    findAll() {
        return this.paymentRepository.find();
    }

    findOne(id: number) {
        return this.paymentRepository.findOne(id);
    }

    update(id: number, updatePaymentDto: UpdatePaymentDto) {
        return `This action updates a #${id} payment`;
    }

    remove(id: number) {
        return `This action removes a #${id} payment`;
    }
}