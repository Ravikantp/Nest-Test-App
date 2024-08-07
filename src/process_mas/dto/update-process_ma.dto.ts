import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {  IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProcessMaDto implements Prisma.PROCESS_MASUpdateInput {

    @ApiProperty()
    @IsNotEmpty({ message: 'Process Name Cannot be null' })
    @IsString({message:"Process Name Should be string"})
    PROCE_NAME: string

    @ApiProperty()
    @IsString({message:"Process Code Should be string"})
    PROCE_CODE: string

    @ApiProperty()
    @IsNotEmpty({ message: 'Company Seq Cannot be null' })
    @IsNumber()
    COMP_SEQ: number

    UPDATE_AT: string | Date;

}
