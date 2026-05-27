import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WorkRecordsService } from './work-records.service';
import { AddWorkRecordDto } from './dto/add-work-record.dto';
import { UpdateWorkRecordDto } from './dto/update-work-record.dto';

@Controller()
export class WorkRecordsController {
  constructor(private readonly workRecordsService: WorkRecordsService) {}

  @Get('get-work-types')
  getWorkTypes() {
    return this.workRecordsService.getWorkTypes();
  }

  @Get('get-work-records')
  getWorkRecords(
    @Query('sort', new DefaultValuePipe('desc')) sort: 'asc' | 'desc',
  ) {
    return this.workRecordsService.getWorkRecords(sort);
  }

  @Post('add-work-record')
  addWorkRecord(@Body() dto: AddWorkRecordDto) {
    return this.workRecordsService.addWorkRecord(dto);
  }

  @Patch('update-work-record')
  updateWorkRecord(@Query('id') id: string, @Body() dto: UpdateWorkRecordDto) {
    return this.workRecordsService.updateWorkRecord(id, dto);
  }

  @Delete('delete-work-record')
  deleteWorkRecord(@Query('id') id: string) {
    return this.workRecordsService.deleteWorkRecord(id);
  }
}
