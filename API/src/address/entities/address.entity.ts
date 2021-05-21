import { UserEntity } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ width: 12, nullable: true })
  mobileNo: string;

  @Column()
  line1: string;

  @Column({ nullable: true })
  line2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ type: "integer" })
  pincode: number;

  @Column({ type: "datetime" })
  createdAt: string;

  // many addresses will be for one userentity
  @ManyToOne((type) => UserEntity, (user) => user.userId)
  user: UserEntity;
}