/*
  Warnings:

  - Added the required column `password` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `MedicalInstitutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `MedicalInstitutions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MedicalInstitutions" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patients" ADD COLUMN     "password" TEXT NOT NULL;
