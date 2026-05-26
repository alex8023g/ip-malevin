'use server';

import { revalidatePath } from 'next/cache';
import { WorkRecordsResponseSchema, WorkTypesResponseSchema } from '@/lib/schemas';

const BACKEND_URL = process.env.BACKEND_URL; // ?? 'http://localhost:3001';

export async function getWorkRecords(sort: 'asc' | 'desc' = 'desc') {
  return fetch(`${BACKEND_URL}/get-work-records?sort=${sort}`)
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
  const res = await fetch(`${BACKEND_URL}/add-work-record`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add work record');
  revalidatePath('/');
}

export async function getWorkTypes() {
  return fetch(`${BACKEND_URL}/get-work-types`)
    .then((res) => res.json())
    .then((data) => WorkTypesResponseSchema.parse(data))
    .catch((err) => console.error(err));
}

export async function deleteWorkRecord(id: string) {
  const res = await fetch(`${BACKEND_URL}/delete-work-record?id=${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete work record');
  revalidatePath('/');
}
