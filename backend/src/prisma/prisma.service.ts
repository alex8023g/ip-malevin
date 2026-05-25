import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  readonly client: PrismaClient;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    const adapter = new PrismaMariaDb(connectionString);
    this.client = new PrismaClient({ adapter });
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
