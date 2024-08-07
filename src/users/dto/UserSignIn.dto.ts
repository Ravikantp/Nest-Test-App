import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignInDto  {

    @ApiProperty()
    @IsNotEmpty({ message: 'Email Cannot be null' })
    @IsEmail({}, { message: "Please Provid a Valid Email" })
    USER_EMAIL: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Paswword Cannot be null' })
    @MinLength(5, { message: 'Password Minimum 6 latter' })
    @IsString({message:"Password Should be string"})
    PASSWORD: string;
}

