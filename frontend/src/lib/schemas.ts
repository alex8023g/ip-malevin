import { z } from 'zod';

export const UnitSchema = z.enum(['M', 'M2', 'M3', 'PCS']);

export const WorkTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  unit: UnitSchema,
});

export const WorkRecordSchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  workTypeId: z.string(),
  volume: z.string(),
  executorName: z.string(),
  workType: WorkTypeSchema,
});

export const WorkTypesResponseSchema = z.array(WorkTypeSchema);
export const WorkRecordsResponseSchema = z.array(WorkRecordSchema);

export type WorkType = z.infer<typeof WorkTypeSchema>;
export type WorkRecord = z.infer<typeof WorkRecordSchema>;
export type WorkRecordsResponse = z.infer<typeof WorkRecordsResponseSchema>;
