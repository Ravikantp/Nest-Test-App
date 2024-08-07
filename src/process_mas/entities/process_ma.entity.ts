import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProcessMas implements Prisma.PROCESS_MASCreateInput {
    @ApiProperty()
    @IsNotEmpty({ message: 'Process name Cannot be null' })
    @IsString({message:"Process Name Should be string"})
    PROCE_NAME: string;

    @ApiProperty()
    @IsString({message:"Process Code Should be string"})
    PROCE_CODE?: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Company Seq Cannot be null' })
    @IsNumber()
    COMP_SEQ: number;

    INSERT_BY_SEQ :number
   
}
