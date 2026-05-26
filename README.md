# ip-malevin

Тестовое задание ИП Малевин. Приложение для учета выполненных работ в строительной области.

## Features

- чтение / удаление / добавление / редактирование записей о выполненных работах

## Tech Stack

- **Backend:**
  Node.js,
  Nest.js (предоставляет хорошую структуру проекта, есть в требованиях вакансии, плюс требование взаимодействия бэк-фронт через API, есл бы не это требование я бы использовал серверные акшены next.js и не использовал nest совсем (весь бэк был бы на стороне Next.js) во многих случаях этого достаточно и очень удобно )
  PrismaOrm

- **Database:** MySQL (есть в требованиях вакансии)
- **Frontend:**
  React,
  Next.js - SSR, есть в требованиях вакансии, очень мощный фреймворк при использовании server-actions и в связке с Prisma ORM позволяет тянуть типизацию от структуры (схемы) БД до последнего чекбокса  
  Tailwind CSS - если нет мактеов фигма, то удобнее и быстрее
  Запрос к api осуществляется через server actions (для Next.js это лучший подход).
  Могу переделать на SPA + Tanstack Query (просто напишите), для Next.js лучше server actions.
- **DevOps:** Docker

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- MySQL 8

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/alex8023g/ip-malevin.git
cd project-name
```

### 2. Set up environment variables

### 3. Run with Docker

```bash
docker compose up -d
```

App runs at `http://localhost:3000`
