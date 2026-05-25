import { getWorkRecords } from './serverActions';

export default async function Home() {
  const workRecords = await getWorkRecords();
  console.log('🚀 ~ Home ~ workRecords:', workRecords);
  return (
    <div>
      <header>
        <h1>Тестовое задание ИП Малевин</h1>
      </header>
      <main>
        <ul>
          <li className='hidden md:grid md:grid-cols-[3fr_1fr_2fr_1fr] md:gap-4'>
            <span>ФИО</span>
            <span>Дата</span>
            <span>Вид работы</span>
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
