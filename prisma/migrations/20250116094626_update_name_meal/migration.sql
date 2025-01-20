/*
  Warnings:

  - You are about to drop the column `meal` on the `meals` table. All the data in the column will be lost.
  - Added the required column `nameMeal` to the `meals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meals` DROP COLUMN `meal`,
    ADD COLUMN `nameMeal` VARCHAR(100) NOT NULL;
