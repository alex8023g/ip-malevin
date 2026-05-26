import { AddWorkRecordBtn } from '@/components/AddWorkRecordBtn';
import { getWorkRecords, getWorkTypes } from './serverActions';

export default async function Home() {
  const [workRecords, workTypes] = await Promise.all([getWorkRecords(), getWorkTypes()]);

  return (
    <div className='p-3'>
      <header>
        <h1>Тестовое задание ИП Малевин</h1>
      </header>
      <main>
        <div className='flex justify-between'>
          <h2>Выполненные работы</h2>
          <AddWorkRecordBtn workTypes={workTypes ?? []} />
        </div>
        <ul>
          <li className='hidden border md:grid md:grid-cols-[3fr_1fr_2fr_1fr] md:gap-4'>
            <span>ФИО</span>
            <span>Дата</span>
            <span>Вид работ</span>
            <span>Объем</span>
          </li>
          {workRecords?.map((workRecord) => (
            <li
              key={workRecord.id}
              className='border md:grid md:grid-cols-[3fr_1fr_2fr_1fr] md:gap-4'
            >
              <div>
                <span className='md:hidden'>ФИО:</span>
                <span>{workRecord.executorName}</span>
              </div>
              <div>
                <span className='md:hidden'>Дата:</span>
                <span>
                  {workRecord.date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className='md:hidden'>Вид работы:</span>
                <span>{workRecord.workType.name}</span>
              </div>
              <div>
                <span className='md:hidden'>Объём:</span>
                <span>
                  {workRecord.volume} {workRecord.workType.unit}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
