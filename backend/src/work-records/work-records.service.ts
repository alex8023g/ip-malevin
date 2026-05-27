import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddWorkRecordDto } from './dto/add-work-record.dto';
import { UpdateWorkRecordDto } from './dto/update-work-record.dto';

@Injectable()
export class WorkRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  getWorkTypes() {
    return this.prisma.client.workType.findMany();
  }

  getWorkRecords(sort: 'asc' | 'desc' = 'desc') {
    return this.prisma.client.workRecord.findMany({
      include: { workType: true },
      orderBy: { date: sort },
    });
  }

  addWorkRecord(dto: AddWorkRecordDto) {
    return this.prisma.client.workRecord.create({
      data: {
        date: new Date(dto.date),
        workTypeId: dto.workTypeId,
        volume: dto.volume,
        executorName: dto.executorName,
      },
      include: { workType: true },
    });
  }

  updateWorkRecord(id: string, dto: UpdateWorkRecordDto) {
    return this.prisma.client.workRecord.update({
      where: { id },
      data: {
        ...(dto.date && { date: new Date(dto.date) }),
        ...(dto.workTypeId && { workTypeId: dto.workTypeId }),
        ...(dto.volume !== undefined && { volume: dto.volume }),
        ...(dto.executorName && { executorName: dto.executorName }),
      },
      include: { workType: true },
    });
  }

  deleteWorkRecord(id: string) {
    return this.prisma.client.workRecord.delete({
      where: { id },
    });
  }
}
