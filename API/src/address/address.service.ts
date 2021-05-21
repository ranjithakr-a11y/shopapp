import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/auth/user/user.service";
import { Repository } from "typeorm";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "./entities/address.entity";

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address)
        private addressRepository: Repository<Address>,
        private userService: UserService
    ) {}
    async create(uid: string, createAddressDto: CreateAddressDto) {
        const user = await this.userService.findById(uid);
        const {
            city,
            line1,
            line2,
            pincode,
            state,
            firstName,
            lastName,
            mobileNo,
        } = createAddressDto;
        return this.addressRepository.save({
            firstName,
            lastName,
            mobileNo,
            city,
            line1,
            line2,
            pincode,
            state,
            user: user,
            createdAt: new Date().toISOString(),
        });
    }

    findAll() {
        return this.addressRepository.find({ relations: ["user"] });
    }

    async findOne(id: number) {
        return this.addressRepository.findOne(id).then((data) => {
            if (!data) throw new NotFoundException();
            return data;
        });
    }

    update(id: number, updateAddressDto: UpdateAddressDto) {
        return this.addressRepository.update(
            { id },
            {
                ...updateAddressDto,
            }
        );
    }

    remove(id: number) {
        return this.addressRepository.delete({ id });
    }

    async findById(id: string) {
        return this.addressRepository.find({
            where: { user: id },
            relations: ["user"],
        });
    }
}
