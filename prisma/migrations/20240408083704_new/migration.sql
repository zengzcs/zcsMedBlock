/*
  Warnings:

  - A unique constraint covering the columns `[doctorId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `Patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userCategoryId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "userCategoryId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_doctorId_key" ON "Doctor"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "Patients_patientId_key" ON "Patients"("patientId");
