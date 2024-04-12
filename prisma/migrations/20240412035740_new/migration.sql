/*
  Warnings:

  - You are about to drop the column `patientsPatientId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `doctorDoctorId` on the `Patients` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_medicalInstitutionId_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_patientsPatientId_fkey";

-- DropForeignKey
ALTER TABLE "PatientMedicationRecord" DROP CONSTRAINT "PatientMedicationRecord_docterId_fkey";

-- DropForeignKey
ALTER TABLE "PatientMedicationRecord" DROP CONSTRAINT "PatientMedicationRecord_patientId_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "patientsPatientId";

-- AlterTable
ALTER TABLE "MedicalInstitutions" ADD COLUMN     "includeDoctorId" INTEGER[];

-- AlterTable
ALTER TABLE "Patients" DROP COLUMN "doctorDoctorId",
ADD COLUMN     "authorizedDoctorsId" INTEGER[],
ADD COLUMN     "authorizedInstitutionId" INTEGER[];
