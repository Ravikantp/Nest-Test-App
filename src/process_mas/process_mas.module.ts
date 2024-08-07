import { Module } from '@nestjs/common';
import { ProcessMasService } from './process_mas.service';
import { ProcessMasController } from './process_mas.controller';
import { PrismaServices } from 'src/prisama.services';

@Module({
  controllers: [ProcessMasController],
  providers: [ProcessMasService,PrismaServices],
})
export class ProcessMasModule {}
