import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProcessMasService } from './process_mas.service';
import { ProcessMas } from './entities/process_ma.entity';
import { AuthenticationGuard } from 'src/Utility/Guards/Authentication.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/Utility/Decoders/cureent-users.decoder';
import { Prisma, Roles } from '@prisma/client';
import { UpdateProcessMaDto } from './dto/update-process_ma.dto';
import { AuthorizeRoles } from 'src/Utility/Decoders/authorize-role.decoder';
import { AuthorizeGuard } from 'src/Utility/Guards/Authorization.guard';


@Controller('process-mas')
@ApiTags('Process Mas')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthenticationGuard, AuthorizeGuard)
export class ProcessMasController {
  constructor(private readonly processMasService: ProcessMasService) {}
  @AuthorizeRoles("ADMIN","USER")
  @Post('create')
  async create(@Body() createProcessMaDto: ProcessMas,@CurrentUser() currentUser:Prisma.USER_MASMinAggregateOutputType) {
    return this.processMasService.create(createProcessMaDto,currentUser.SEQ_NO);
  }

  @AuthorizeRoles("ADMIN")
  @Get('findall')
  async findAll() {
    return this.processMasService.findAll();
  }

  @AuthorizeRoles("ADMIN","USER")
  @Get('findbyid/:seq_no')
 async findOne(@Param('seq_no') seq_no: number) {
    return this.processMasService.findOne(seq_no);
  }

  @AuthorizeRoles(Roles.ADMIN)
  @Patch('update/:seq_no')
 async update(@Param('seq_no') seq_no: number, @Body() updateProcessMaDto: UpdateProcessMaDto) {
    return this.processMasService.update(seq_no, updateProcessMaDto);
  }

  @AuthorizeRoles("ADMIN","USER")
  @Get('findbyname/:name')
  async findByName(@Param('name') name:string){
    return this.processMasService.FindByName(name);
  }

  @AuthorizeRoles(Roles.ADMIN)
  @Delete(':seq_no')
 async remove(@Param('seq_no') seq_no: number) {
    return this.processMasService.remove(seq_no);
  }
}
