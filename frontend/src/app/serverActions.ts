'use server';

import { revalidatePath } from 'next/cache';
import { WorkRecordsResponseSchema, WorkTypesResponseSchema } from '@/lib/schemas';

export async function getWorkRecords() {
  return fetch('http://localhost:3001/get-work-records')
    .then((res) => res.json())
    .then((data) => WorkRecordsResponseSchema.parse(data))
    .catch((err) => console.error(err));
}

export async function addWorkRecord(data: {
  executorName: string;
  date: string;
  workTypeId: string;
  volume: string;
}) {
  const res = await fetch('http://localhost:3001/add-work-record', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add work record');
  revalidatePath('/');
}

export async function getWorkTypes() {
  return fetch('http://localhost:3001/get-work-types')
    .then((res) => res.json())
    .then((data) => WorkTypesResponseSchema.parse(data))
    .catch((err) => console.error(err));
}
