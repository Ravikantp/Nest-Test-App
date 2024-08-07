import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaServices } from 'src/prisama.services';
import { USER_MAS } from './entities/user.entity';
import { UserSignInDto } from './dto/UserSignIn.dto';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepositry: PrismaServices,
   
  ) { }

  async SignUp(data: USER_MAS): Promise<USER_MAS> {
    const userExits = await this.FindByEmail(data.USER_EMAIL);
    if (userExits) {
      throw new BadRequestException('Email Is Not available')
    }
    data.FULL_NAME = data.FIRST_NAME + " " + data.MIDDLE_NAME + " " + data.LAST_NAME;
    return this.usersRepositry.uSER_MAS.create({
      data,
    });
  }
  async SignIn(loginData: UserSignInDto): Promise<USER_MAS> {
    const userExits = await this.FindByEmail(loginData.USER_EMAIL);
    if (await userExits && (await userExits).PASSWORD == loginData.PASSWORD) {
      return new USER_MAS(userExits);
    }
    throw new BadRequestException('UserName & Password  Invalid');
  }

  async findAll(): Promise<USER_MAS[]> {
    const records = this.usersRepositry.uSER_MAS.findMany();
    if ((await records).length > 0) { return records }
    throw new NotFoundException("data Not Found");
  }

  async findOne(SEQ_NO: number): Promise<USER_MAS> {
    return this.usersRepositry.uSER_MAS.findUnique({ where: { SEQ_NO: Number(SEQ_NO) } });
  }

  async update(SEQ_NO: number, updateUsers: UpdateUserDto): Promise<USER_MAS> {
    const userExits = await this.findOne(SEQ_NO);
    if (userExits) {
      const fullname = ((updateUsers.FIRST_NAME == null) ? userExits.FIRST_NAME : updateUsers.FIRST_NAME) + " " +
        ((updateUsers.MIDDLE_NAME == null) ? userExits.MIDDLE_NAME : updateUsers.MIDDLE_NAME) + " " +
        ((updateUsers.LAST_NAME == null) ? userExits.LAST_NAME : updateUsers.LAST_NAME);
      return this.usersRepositry.uSER_MAS.update({
        where: {
          SEQ_NO: Number(SEQ_NO)
        },
        data: {
          USER_EMAIL: updateUsers.USER_EMAIL, FIRST_NAME: updateUsers.FIRST_NAME,
          MIDDLE_NAME: updateUsers.MIDDLE_NAME, LAST_NAME: updateUsers.LAST_NAME,
          FULL_NAME: fullname
        }
      });
    }
    throw new BadRequestException('User Is Not available')
  }
  async FindByEmail(email: string): Promise<USER_MAS> {
    return this.usersRepositry.uSER_MAS.findUnique({
      where: { USER_EMAIL: email }
    });
  }
  async remove(id: number) {
    const userExits = await this.findOne(id);
    if (!userExits) {
      throw new BadRequestException('User Doent not Exits')
    }
    return this.usersRepositry.uSER_MAS.delete({ where: { SEQ_NO: Number(id) } });
  }
  async accesToken(user: USER_MAS): Promise<string> {
    const payload = { SEQ_NO: user.SEQ_NO, USER_EMAIL: user.USER_EMAIL, PASSWORD: user.PASSWORD, ROLES: user.ROLES };
    const secretKey = process.env.ACCES_TOKEN_SECRET_KEY;
    const expiresIn = process.env.ACCES_TOKEN_EXPIRE_TIME;

    return sign(payload, secretKey, { expiresIn });
  }
 
   async updateToken(SEQ_NO:number,Token :string){
    const result = await this.usersRepositry.$queryRaw`UPDATE public."USER_MAS" SET "TOKEN"=${Token} WHERE "SEQ_NO"=${SEQ_NO}`
    return result
   }
   async logOut(SEQ_NO:number){
    await this.updateToken(SEQ_NO,null);
   }
}
