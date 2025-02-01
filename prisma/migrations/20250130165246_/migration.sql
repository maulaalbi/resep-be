-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_mealId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_userId_fkey`;

-- DropIndex
DROP INDEX `transactions_mealId_fkey` ON `transactions`;

-- DropIndex
DROP INDEX `transactions_userId_fkey` ON `transactions`;
