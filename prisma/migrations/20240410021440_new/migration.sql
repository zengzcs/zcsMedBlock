/*
  Warnings:

  - Added the required column `accountAddress` to the `Admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admins" ADD COLUMN     "accountAddress" TEXT NOT NULL;
