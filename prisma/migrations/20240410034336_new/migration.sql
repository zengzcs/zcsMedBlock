/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Admins` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Admins_name_key" ON "Admins"("name");
