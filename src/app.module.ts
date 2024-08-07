import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './Utility/Middlewares/current-user.middleware';
import { ProcessMasModule } from './process_mas/process_mas.module';


@Module({
  imports: [UsersModule,ProcessMasModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule  {
  configure(consumer: MiddlewareConsumer) {
  consumer
    .apply(CurrentUserMiddleware)
    .forRoutes({ path: '*', method: RequestMethod.ALL });
}}
