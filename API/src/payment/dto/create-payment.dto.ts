import { ApiProperty } from "@nestjs/swagger";


    export class CreatePaymentDto {
        @ApiProperty({ example: "payment" })
        amountPaid: number;
    
        @ApiProperty()
        paymentDate: Date;
    
        @ApiProperty()
        paymentMethod?: string;
    
        @ApiProperty()
        paymentType?: string;
    
        @ApiProperty()
        user: string;
    }
