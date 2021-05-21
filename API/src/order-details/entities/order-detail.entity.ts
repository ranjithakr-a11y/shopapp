import { Address } from "src/address/entities/address.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import { Order } from "src/order/entities/order.entity";
import { Payment } from "src/payment/entities/payment.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "order-details" })
export class OrderDetail {
    //@PrimaryColumn()
    @PrimaryGeneratedColumn({ type: "integer" })
    orderDetailId: number;

    @Column({ type: "decimal", precision: 10 })
    orderAmount: number;

    @Column({ type: "integer" })
    orderQty: number;

    @OneToMany(() => Order, (order) => order.orderId)
    @JoinColumn({ name: "orderId" })
    orderId: number;

    @ManyToOne(() => UserEntity, (user) => user.userId)
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @ManyToOne(() => Payment, (payment) => payment.paymentId)
    @JoinColumn({ name: "paymentId" })
    paymentId: number;

    @ManyToOne(() => Address, (address) => address.id)
    @JoinColumn({ name: "address" })
    address: number;
}