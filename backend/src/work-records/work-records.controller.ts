import { Body, Controller, Delete, Get, Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { WorkRecordsService } from './work-records.service';
import { AddWorkRecordDto } from './dto/add-work-record.dto';

@Controller()
export class WorkRecordsController {
  constructor(private readonly workRecordsService: WorkRecordsService) {}

  @Get('get-work-records')
  getWorkRecords() {
    return this.workRecordsService.getWorkRecords();
  }

  @Post('add-work-record')
  addWorkRecord(@Body() dto: AddWorkRecordDto) {
    return this.workRecordsService.addWorkRecord(dto);
  }

  @Delete('delete-work-record')
  deleteWorkRecord(@Query('id') id: string) {
    return this.workRecordsService.deleteWorkRecord(id);
  }
}
