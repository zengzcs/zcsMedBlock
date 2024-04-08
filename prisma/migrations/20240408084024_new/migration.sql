/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountAddress` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "accountAddress" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_userId_key" ON "Users"("userId");
