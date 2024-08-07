import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaServices } from 'src/prisama.services';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports:[CacheModule.register
    ({ ttl: 5, 
    max: 10,})],
  controllers: [UsersController],
  providers: [UsersService,PrismaServices,{
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  }],
  exports:[UsersService],
})
export class UsersModule {}
