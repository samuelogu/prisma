/*
  Warnings:

  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN     `username` VARCHAR(191) NOT NULL,
    ADD COLUMN     `phone` VARCHAR(191),
    ADD COLUMN     `website` VARCHAR(191),
    MODIFY `name` VARCHAR(191) NOT NULL;
