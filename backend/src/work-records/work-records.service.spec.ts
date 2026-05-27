import { Test, TestingModule } from '@nestjs/testing';
import { WorkRecordsService } from './work-records.service';
import { PrismaService } from '../prisma/prisma.service';

const mockWorkType = { id: 'wt-1', name: 'Покос', unit: 'га' };

const mockRecord = {
  id: 'rec-1',
  executorName: 'Иванов И.И.',
  date: new Date('2024-06-01'),
  workTypeId: 'wt-1',
  volume: 5,
  workType: mockWorkType,
};

const prismaMock = {
  client: {
    workType: {
      findMany: jest.fn(),
    },
    workRecord: {
      findMany: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    },
  },
};

describe('WorkRecordsService', () => {
  let service: WorkRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkRecordsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<WorkRecordsService>(WorkRecordsService);
    jest.clearAllMocks();
  });

  describe('getWorkTypes', () => {
    it('returns all work types', async () => {
      prismaMock.client.workType.findMany.mockResolvedValue([mockWorkType]);

      const result = await service.getWorkTypes();

      expect(prismaMock.client.workType.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockWorkType]);
    });
  });

  describe('getWorkRecords', () => {
    it('returns records ordered desc by default', async () => {
      prismaMock.client.workRecord.findMany.mockResolvedValue([mockRecord]);

      const result = await service.getWorkRecords();

      expect(prismaMock.client.workRecord.findMany).toHaveBeenCalledWith({
        include: { workType: true },
        orderBy: { date: 'desc' },
      });
      expect(result).toEqual([mockRecord]);
    });

    it('passes asc sort to prisma', async () => {
      prismaMock.client.workRecord.findMany.mockResolvedValue([mockRecord]);

      await service.getWorkRecords('asc');

      expect(prismaMock.client.workRecord.findMany).toHaveBeenCalledWith({
        include: { workType: true },
        orderBy: { date: 'asc' },
      });
    });
  });

  describe('addWorkRecord', () => {
    it('creates a record with correct data', async () => {
      prismaMock.client.workRecord.create.mockResolvedValue(mockRecord);

      const dto = {
        executorName: 'Иванов И.И.',
        date: '2024-06-01',
        workTypeId: 'wt-1',
        volume: 5,
      };

      const result = await service.addWorkRecord(dto);

      expect(prismaMock.client.workRecord.create).toHaveBeenCalledWith({
        data: {
          executorName: dto.executorName,
          date: new Date(dto.date),
          workTypeId: dto.workTypeId,
          volume: dto.volume,
        },
        include: { workType: true },
      });
      expect(result).toEqual(mockRecord);
    });
  });

  describe('deleteWorkRecord', () => {
    it('deletes a record by id', async () => {
      prismaMock.client.workRecord.delete.mockResolvedValue(mockRecord);

      const result = await service.deleteWorkRecord('rec-1');

      expect(prismaMock.client.workRecord.delete).toHaveBeenCalledWith({
        where: { id: 'rec-1' },
      });
      expect(result).toEqual(mockRecord);
    });
  });
});
