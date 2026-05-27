'use server';

import { revalidatePath } from 'next/cache';
import { WorkRecordsResponseSchema, WorkTypesResponseSchema } from '@/lib/schemas';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:3001';

export async function getWorkRecords(sort: 'asc' | 'desc' = 'desc') {
  try {
    const res = await fetch(`${BACKEND_URL}/api/get-work-records?sort=${sort}`);
    const data = await res.json();
    const parsedData = WorkRecordsResponseSchema.parse(data);
    return { ok: true, data: parsedData };
  } catch (err) {
    console.error(err);
    return { ok: false, error: 'Ошибка сервера. Попробуйте позже.' };
  }
}

export async function addWorkRecord(data: {
  executorName: string;
  date: string;
  workTypeId: string;
  volume: string;
}) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/add-work-record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return { error: 'Не удалось сохранить запись. Попробуйте позже.' };
    revalidatePath('/');
  } catch {
    return { error: 'Не удалось сохранить запись. Попробуйте позже.' };
  }
}

export async function getWorkTypes() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/get-work-types`);
    const data = await res.json();
    const parsedData = WorkTypesResponseSchema.parse(data);
    return { ok: true, data: parsedData };
  } catch (err) {
    console.error(err);
    return { ok: false, error: 'Ошибка сервера. Попробуйте позже.' };
  }
}

export async function updateWorkRecord(
  id: string,
  data: { executorName?: string; date?: string; workTypeId?: string; volume?: string },
): Promise<{ error: string } | void> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/update-work-record?id=${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) return { error: 'Не удалось обновить запись. Попробуйте позже.' };
    revalidatePath('/');
  } catch {
    return { error: 'Не удалось обновить запись. Попробуйте позже.' };
  }
}

export async function deleteWorkRecord(id: string) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/delete-work-record?id=${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) return { error: 'Не удалось удалить запись. Попробуйте позже.' };
    revalidatePath('/');
  } catch {
    return { error: 'Не удалось удалить запись. Попробуйте позже.' };
  }
}
