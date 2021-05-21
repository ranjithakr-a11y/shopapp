import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({ example: "order" })
    isCancelled: boolean;

}


