import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { isArray } from 'class-validator';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

// declare global {
//   namespace Express {
//     interface Request {
//       currentUsers?: USER_MAS;
//     }
//   }
// }
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly userServices: UsersService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || isArray(authHeader) || !authHeader.startsWith('Bearer ')) {
      req['ActiveUser'] = null;
      if(req.originalUrl=='/users/signin'||req.originalUrl=='/users/signup'||req.originalUrl=='/users/findalld'){
        return next();
      }
      throw new UnauthorizedException('You are not SingIn')
    }
    else {
      try {
        const token = authHeader.split(' ')[1];
        const currentUser = await this.verifyUser(token);
       if(currentUser){
        req['ActiveUser']=currentUser;
        next();
       }   
      } catch (error) {
        req['ActiveUser'] = null;
        throw new UnauthorizedException(error);
      }
    }
  }
  async verifyUser(token:string){
    const secretKey = process.env.ACCES_TOKEN_SECRET_KEY;
    if (!secretKey) {
      throw new Error('Secret key not defined in environment variables');
    }
    const { SEQ_NO } = <JwtPayload>verify(token, secretKey);
    const currentUser = await this.userServices.findOne(SEQ_NO);
    console.log(currentUser);
    if(currentUser.TOKEN!=token){
      await this.userServices.updateToken(currentUser.SEQ_NO,null);
      throw new UnauthorizedException('Token Expire')
    }
    return currentUser;
  }
}
interface JwtPayload {
  SEQ_NO: number;
}

