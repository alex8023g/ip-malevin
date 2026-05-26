import { AddWorkRecordBtn } from '@/components/AddWorkRecordBtn';
import { WorkRecordMenu } from '@/components/WorkRecordMenu';
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
          <li className='hidden border md:grid md:grid-cols-[3fr_1fr_2fr_1fr_2rem] md:gap-4'>
            <span>ФИО</span>
            <span>Дата</span>
            <span>Вид работ</span>
            <span>Объем</span>
            <span />
          </li>
          {workRecords?.map((workRecord) => (
            <li
              key={workRecord.id}
              className='flex border md:grid md:grid-cols-[3fr_1fr_2fr_1fr_2rem] md:gap-4'
            >
              <div className='flex flex-1 flex-col md:contents'>
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
