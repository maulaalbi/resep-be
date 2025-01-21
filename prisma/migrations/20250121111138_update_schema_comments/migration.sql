-- AlterTable
ALTER TABLE `ratings` ADD COLUMN `comments` TEXT NULL,
    MODIFY `rating` INTEGER NULL;
