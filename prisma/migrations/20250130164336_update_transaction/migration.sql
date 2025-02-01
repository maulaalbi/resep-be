/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meals` ADD COLUMN `price` INTEGER NULL;

-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `orderId` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `transactions_orderId_key` ON `transactions`(`orderId`);
