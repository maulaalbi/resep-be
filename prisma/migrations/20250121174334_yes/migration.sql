/*
  Warnings:

  - You are about to alter the column `gender` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL DEFAULT 'OTHER',
    ALTER COLUMN `tgl_lahir` DROP DEFAULT;
