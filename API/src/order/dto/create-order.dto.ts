import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderDto {
    @ApiProperty({ example: "order" })
    totalAmount: number;

    @ApiProperty()
    orderDate: Date;

    @ApiProperty()
    shoppingDate: Date;

    @ApiProperty()
    products: string;

    @ApiProperty()
    qty: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    user: string;
}