import { ApiProperty } from "@nestjs/swagger";
import { Prisma } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto implements Prisma.USER_MASUpdateInput {
    @ApiProperty()
    @IsNotEmpty({ message: 'Email Cannot be null' })
    @IsEmail({}, { message: "Please Provid a Valid Email" })
    @IsString({ message: "Email Should be string" })
    USER_EMAIL: string;

    @IsNotEmpty({ message: 'First Name Cannot be null' })
    @IsString({ message: "First Name Should be string" })
    @ApiProperty()
    FIRST_NAME: string;

    @ApiProperty()
    @IsString({ message: "Middle Name Should be string" })
    MIDDLE_NAME?: string;

    @ApiProperty()
    @IsString({ message: "Last Name Should be string" })
    LAST_NAME?: string;

    @ApiProperty()
    FULL_NAME?: string;

    UPDATE_AT?: string | Date;
}
