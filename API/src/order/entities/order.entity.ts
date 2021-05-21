import { Address } from "src/address/entities/address.entity";
import { UserEntity } from "src/auth/entities/user.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "order" })
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number;

    @Column({ nullable: true, precision: 10 })
    totalAmount: number;

    @Column({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    orderDate: Date;

    @Column({ nullable: true, default: () => "CURRENT_TIMESTAMP" })
    shoppingDate: Date;

    @Column({ default: "pending" })
    status: string;

    @Column({ length: 10000 })
    products: string;

    @Column({ default: false, nullable: false })
    isCancelled: boolean;

    @ManyToOne(() => UserEntity, (user) => user.userId)
    @JoinColumn({ name: "userId" })
    user: UserEntity;

    @OneToMany(() => Address, (address) => address.user)
    @JoinColumn({ name: "address" })
    address: Address;
}