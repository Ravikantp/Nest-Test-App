import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private readonly reflactor: Reflector) { }
  canActivate(context: ExecutionContext): boolean {
    const allowedRoles = this.reflactor.get<string[]>('allowedRoles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.ActiveUser;
    // const result= (allowedRoles.includes(user.Roles)) ? ((user.ISACTIVE)?true: new UnauthorizedException('Sorry , You are not Active Current.')):new UnauthorizedException('Sorry , You are not authorize.');
    // if(result) return true;
    // throw result;
    if (allowedRoles.includes(user.ROLES)) {
      if(user.ISACTIVE==true){
        return true;
      }
      throw new UnauthorizedException('Sorry , You are not Active Current.');
    }
    //   const result=request?.currentUsers?.roles.map((roles:string)=>allowedRoles.includes(roles)).find
    //    ((val:boolean)=>val===true);
    //    if(result) return true;

    throw new UnauthorizedException('Sorry , You are not authorize.');
  }
}