import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient, Unit } from '../../generated/prisma/client';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const workTypes = [
  { name: 'кладка перегородок', unit: Unit.M2 },
  { name: 'монтаж опалубки', unit: Unit.M3 },
  { name: 'прокладка эл. кабеля 220В', unit: Unit.M },
  { name: 'монтаж двери', unit: Unit.PCS },
];

// workType indices match the array above (0-based)
const workRecords = [
  {
    date: new Date('2025-05-01'),
    workTypeIndex: 0, // кладка перегородок
    volume: 34.5,
    executorName: 'Иванов Иван Иванович',
  },
  {
    date: new Date('2025-05-03'),
    workTypeIndex: 1, // монтаж опалубки
    volume: 12.0,
    executorName: 'Петров Пётр Петрович',
  },
  {
    date: new Date('2025-05-07'),
    workTypeIndex: 2, // прокладка эл. кабеля 220В
    volume: 85.0,
    executorName: 'Сидоров Алексей Владимирович',
  },
  {
    date: new Date('2025-05-10'),
    workTypeIndex: 3, // монтаж двери
    volume: 3.0,
    executorName: 'Иванов Иван Иванович',
  },
  {
    date: new Date('2025-05-14'),
    workTypeIndex: 0, // кладка перегородок
    volume: 20.0,
    executorName: 'Петров Пётр Петрович',
  },
];

async function main() {
  console.log('Seeding work types...');

  await prisma.workRecord.deleteMany();
  await prisma.workType.deleteMany();

  const createdTypes = await Promise.all(
    workTypes.map((wt) => prisma.workType.create({ data: wt })),
  );

  console.log('Seeding work records...');
  await prisma.workRecord.createMany({
    data: workRecords.map(({ workTypeIndex, ...record }) => ({
      ...record,
      workTypeId: createdTypes[workTypeIndex].id,
    })),
  });

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
