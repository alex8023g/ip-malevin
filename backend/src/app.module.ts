import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WorkRecordsModule } from './work-records/work-records.module';

@Module({
  imports: [PrismaModule, WorkRecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
