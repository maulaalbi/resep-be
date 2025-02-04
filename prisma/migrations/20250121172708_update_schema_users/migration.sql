-- AlterTable
ALTER TABLE `users` ADD COLUMN `alamat` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE', 'DRAFT') NOT NULL DEFAULT 'DRAFT',
    ADD COLUMN `tgl_lahir` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
