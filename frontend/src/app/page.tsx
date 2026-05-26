import { Suspense } from 'react';

import { AddWorkRecordBtn } from '@/components/AddWorkRecordBtn';
import { SortByDateBtn } from '@/components/SortByDateBtn';
import { WorkRecordMenu } from '@/components/WorkRecordMenu';
import { getWorkRecords, getWorkTypes } from './serverActions';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort = 'desc' } = await searchParams;
  const [workRecords, workTypes] = await Promise.all([
    getWorkRecords(sort as 'asc' | 'desc'),
    getWorkTypes(),
  ]);

  return (
    <div className='p-3'>
      <header>
        <h1 className='text-center text-lg'>Тестовое задание ИП Малевин</h1>
      </header>
      <main>
        <div className='flex justify-between'>
          <h2 className='text-lg'>Выполненные работы</h2>
          <span className='md:hidden'>
            <SortByDateBtn />
          </span>
          <AddWorkRecordBtn workTypes={workTypes ?? []} />
        </div>
        <ul>
          <li className='hidden border pl-3 py-2  md:grid md:grid-cols-[3fr_1fr_2fr_1fr_2rem] md:gap-4 items-center font-semibold'>
            <span>ФИО</span>
            <SortByDateBtn />
            <span>Вид работ</span>
            <span>Объем</span>
            <span />
          </li>
          {workRecords?.map((workRecord) => (
            <li
              key={workRecord.id}
              className='flex border mb-2 rounded-lg pl-3 py-2 md:rounded-none md:mb-0 md:grid md:grid-cols-[3fr_1fr_2fr_1fr_2rem] md:gap-4'
            >
              <div className='flex flex-1 flex-col md:contents'>
                <div className='md:flex items-center'>
                  <span className='md:hidden'>ФИО: </span>
                  <span>{workRecord.executorName}</span>
                </div>
                <div className='md:flex items-center'>
                  <span className='md:hidden'>Дата: </span>
                  <span>
                    {workRecord.date.toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className='md:flex items-center'>
                  <span className='md:hidden'>Вид работы: </span>
                  <span>{workRecord.workType.name}</span>
                </div>
                <div className='md:flex items-center'>
                  <span className='md:hidden'>Объём: </span>
                  <span>
                    {workRecord.volume} {workRecord.workType.unit}
                  </span>
                </div>
              </div>
              <div>
                <WorkRecordMenu recordId={workRecord.id} />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
