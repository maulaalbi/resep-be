-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_mealId_fkey` FOREIGN KEY (`mealId`) REFERENCES `meals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
