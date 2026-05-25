-- CreateTable
CREATE TABLE `work_types` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `unit` ENUM('M', 'M2', 'M3', 'PCS') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_records` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `workTypeId` VARCHAR(191) NOT NULL,
    `volume` DECIMAL(10, 2) NOT NULL,
    `executorName` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `work_records` ADD CONSTRAINT `work_records_workTypeId_fkey` FOREIGN KEY (`workTypeId`) REFERENCES `work_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
