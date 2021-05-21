import { UserEntity } from "src/auth/entities/user.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "payment" })
export class Payment {
    @PrimaryGeneratedColumn()
    paymentId: number;

    @Column({ nullable: true, precision: 10 })
    amountPaid: number;

    @Column({ nullable: false, default: () => "CURRENT_TIMESTAMP" })
    paymentDate: Date;

    @Column({ nullable: true })
    paymentMethod: string;

    @Column()
    orderId: number;

    @ManyToOne(() => UserEntity, (user) => user.userId)
    @JoinColumn({ name: "userId" })
    user: UserEntity;
}