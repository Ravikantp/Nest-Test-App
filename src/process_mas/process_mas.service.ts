import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaServices } from 'src/prisama.services';
import { ProcessMas } from './entities/process_ma.entity';
import { UpdateProcessMaDto } from './dto/update-process_ma.dto';

@Injectable()
export class ProcessMasService {
  constructor(private readonly ProcRepositry: PrismaServices) { }

  async create(data: ProcessMas, User_seq: number) {
    data.INSERT_BY_SEQ = User_seq;
    return this.ProcRepositry.pROCESS_MAS.create({ data, });
  }

  async findAll(): Promise<ProcessMas[]> {
    const process = this.ProcRepositry.pROCESS_MAS.findMany();
    if ((await process).length>0) {
      return process;
    }
    throw new NotFoundException('Data Not Found');
  }

  async findOne(seq_no: number): Promise<ProcessMas> {
    const data = this.ProcRepositry.pROCESS_MAS.findUnique({ where: { SEQ_NO: Number(seq_no) } });
    if (data) {
      return data;
    }
    throw new NotFoundException('Data Not Found');
  }
  async FindByName(name: string): Promise<ProcessMas> {
    const data = this.ProcRepositry.pROCESS_MAS.findFirst({
      where: { PROCE_NAME: String(name) }
    });
    if (data) {
      return data;
    }
    throw new NotFoundException('Record Not Found');
  }

  async update(seq_no: number, updateProcessMaDto: UpdateProcessMaDto): Promise<ProcessMas> {
    const records= await this.findOne(seq_no);
    if(records){return this.ProcRepositry.pROCESS_MAS.update({
      where: {
        SEQ_NO: Number(seq_no)
      },
      data: { PROCE_NAME: updateProcessMaDto.PROCE_NAME, PROCE_CODE: updateProcessMaDto.PROCE_CODE, COMP_SEQ: updateProcessMaDto.COMP_SEQ }
    });}
    throw new NotFoundException('Record does not Exits');
  }

  async remove(id: number) {
    const userExits = await this.findOne(id);
    if (!userExits) {
      throw new BadRequestException('User Doent not Exits')
    }
    return this.ProcRepositry.pROCESS_MAS.delete({ where: { SEQ_NO: Number(id) } });
  }

}
