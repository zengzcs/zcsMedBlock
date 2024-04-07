/*
  Warnings:

  - Added the required column `accountAddress` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountAddress` to the `MedicalInstitutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountAddress` to the `Patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "accountAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MedicalInstitutions" ADD COLUMN     "accountAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patients" ADD COLUMN     "accountAddress" TEXT NOT NULL;
