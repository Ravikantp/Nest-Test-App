import { ApiProperty } from "@nestjs/swagger";
import { $Enums, Prisma } from "@prisma/client";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class USER_MAS implements Prisma.USER_MASCreateInput {

    @Exclude()
    SEQ_NO: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email Cannot be null' })
    @IsEmail({}, { message: "Please Provid a Valid Email" })
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

    FULL_NAME?: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Paswword Cannot be null' })
    @MinLength(5, { message: 'Password Minimum 6 latter' })
    @IsString({ message: "Password Should be string" })
    @Exclude()
    PASSWORD: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please Select Role Cannot be null' })
    @ApiProperty({ enum: ['ADMIN', 'USER'] })
    ROLES: $Enums.Roles;

    @ApiProperty()
    @IsNotEmpty({ message: 'Cannot be null' })
    ISACTIVE: boolean;

    @Exclude({toPlainOnly:true})
    TOKEN?: string

    constructor(partial: Partial<USER_MAS>) {
        Object.assign(this, partial);
      }
      

}
