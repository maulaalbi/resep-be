/*
  Warnings:

  - The primary key for the `saves` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `saves` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `saves` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    MODIFY `saveId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`saveId`);
