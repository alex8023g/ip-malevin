'use server';

import { WorkRecordsResponseSchema } from '@/lib/schemas';

export async function getWorkRecords() {
  return fetch('http://localhost:3001/get-work-records')
    .then((res) => res.json())
    .then((data) => WorkRecordsResponseSchema.parse(data))
    .catch((err) => console.error(err));
}
