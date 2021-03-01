/*
  Warnings:

  - Added the required column `name` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN     `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `body` TEXT;
