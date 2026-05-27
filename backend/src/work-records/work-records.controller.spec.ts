import { Test, TestingModule } from '@nestjs/testing';
import { WorkRecordsController } from './work-records.controller';
import { WorkRecordsService } from './work-records.service';

const mockWorkType = { id: 'wt-1', name: 'Покос', unit: 'га' };

const mockRecord = {
  id: 'rec-1',
  executorName: 'Иванов И.И.',
  date: new Date('2024-06-01'),
  workTypeId: 'wt-1',
  volume: 5,
  workType: mockWorkType,
};

const serviceMock = {
  getWorkTypes: jest.fn(),
  getWorkRecords: jest.fn(),
  addWorkRecord: jest.fn(),
  updateWorkRecord: jest.fn(),
  deleteWorkRecord: jest.fn(),
};

describe('WorkRecordsController', () => {
  let controller: WorkRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkRecordsController],
      providers: [{ provide: WorkRecordsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<WorkRecordsController>(WorkRecordsController);
    jest.clearAllMocks();
  });

  describe('getWorkTypes', () => {
    it('returns work types from service', async () => {
      serviceMock.getWorkTypes.mockResolvedValue([mockWorkType]);

      const result = await controller.getWorkTypes();

      expect(serviceMock.getWorkTypes).toHaveBeenCalledTimes(1);
      expect(result).toEqual([mockWorkType]);
    });
  });

  describe('getWorkRecords', () => {
    it('passes sort param to service and returns records', async () => {
      serviceMock.getWorkRecords.mockResolvedValue([mockRecord]);

      const result = await controller.getWorkRecords('asc');

      expect(serviceMock.getWorkRecords).toHaveBeenCalledWith('asc');
      expect(result).toEqual([mockRecord]);
    });

    it('uses desc as default sort', async () => {
      serviceMock.getWorkRecords.mockResolvedValue([mockRecord]);

      await controller.getWorkRecords('desc');

      expect(serviceMock.getWorkRecords).toHaveBeenCalledWith('desc');
    });
  });

  describe('addWorkRecord', () => {
    it('passes dto to service and returns new record', async () => {
      serviceMock.addWorkRecord.mockResolvedValue(mockRecord);

      const dto = {
        executorName: 'Иванов И.И.',
        date: '2024-06-01',
        workTypeId: 'wt-1',
        volume: 5,
      };

      const result = await controller.addWorkRecord(dto);

      expect(serviceMock.addWorkRecord).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockRecord);
    });
  });

  describe('updateWorkRecord', () => {
    it('passes id and dto to service and returns updated record', async () => {
      const updated = { ...mockRecord, executorName: 'Петров П.П.' };
      serviceMock.updateWorkRecord.mockResolvedValue(updated);

      const dto = { executorName: 'Петров П.П.' };
      const result = await controller.updateWorkRecord('rec-1', dto);

      expect(serviceMock.updateWorkRecord).toHaveBeenCalledWith('rec-1', dto);
      expect(result).toEqual(updated);
    });
  });

  describe('deleteWorkRecord', () => {
    it('passes id to service and returns deleted record', async () => {
      serviceMock.deleteWorkRecord.mockResolvedValue(mockRecord);

      const result = await controller.deleteWorkRecord('rec-1');

      expect(serviceMock.deleteWorkRecord).toHaveBeenCalledWith('rec-1');
      expect(result).toEqual(mockRecord);
    });
  });
});
