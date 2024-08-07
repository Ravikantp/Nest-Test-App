import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, ParseIntPipe, UseInterceptors, ClassSerializerInterceptor, UseFilters, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { USER_MAS } from './entities/user.entity';
import { AuthenticationGuard } from 'src/Utility/Guards/Authentication.guard';
import { CurrentUser } from 'src/Utility/Decoders/cureent-users.decoder';
import { UserSignInDto } from './dto/UserSignIn.dto';
import { Roles } from '@prisma/client';
import { AuthorizeRoles } from 'src/Utility/Decoders/authorize-role.decoder';
import { AuthorizeGuard } from 'src/Utility/Guards/Authorization.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { HttpExceptionFilter } from 'src/Utility/Exception/http-exception.filter';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth('JWT-auth')
@UseInterceptors(CacheInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiProperty()
  @Post('signup')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: USER_MAS,
  })
  async signUp(@Body() data: USER_MAS) {
    return new USER_MAS(await this.usersService.SignUp(data));
  }

  @ApiProperty()
  @Post('signin')
  async signIn(@Body() loginData: UserSignInDto) {
    const user = await this.usersService.SignIn(loginData);
    if (user && user.ISACTIVE) {
      const token = await this.usersService.accesToken(user);
      await this.usersService.updateToken(user.SEQ_NO, token);
      return { token, user }
    }
    throw new BadRequestException('Invalid Or You Are Not Active');
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('findall')
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new USER_MAS(user));
  }

  @ApiProperty()
  @AuthorizeRoles("ADMIN", "USER")
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('findbyemail/:email')
  async findOne(@Param('email') email: string): Promise<USER_MAS> {
    const data = await this.usersService.FindByEmail(email);
    if (!(await data)) { throw new NotFoundException("Data Not found"); }
    return new USER_MAS(data);
  }

  @ApiProperty()
  @AuthorizeRoles("ADMIN")
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Patch('update/:seq_no')
  async update(@Param('seq_no', ParseIntPipe) seq_no: number, @Body() updateUser: UpdateUserDto) {
    return new USER_MAS(await this.usersService.update(seq_no, updateUser));
  }

  @AuthorizeRoles("ADMIN")
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Delete('delete/:seq_no')
  async remove(@Param('seq_no') seq_no: number) {
    return this.usersService.remove(seq_no);
  }
  @AuthorizeRoles("ADMIN", "USER")
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('profile')
  async profile(@CurrentUser() currentUser: USER_MAS) {
    return new USER_MAS(currentUser);
  }
  @Get('logout')
  @UseGuards(AuthenticationGuard)
  async LogOut(@CurrentUser() currentUser: USER_MAS) {
    await this.usersService.updateToken(currentUser.SEQ_NO, null);
  }
}
