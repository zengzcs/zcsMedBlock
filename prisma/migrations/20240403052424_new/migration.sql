/*
  Warnings:

  - You are about to drop the `PatientMedicationRecords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patientDiagnosis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patientMedicines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorizedPatientsStringify` on the `DoctorInfo` table. All the data in the column will be lost.
  - Added the required column `medicalInstitutionId` to the `DoctorInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PatientMedicationRecords_patientId_key";

-- AlterTable
ALTER TABLE "PatientPersonalInfo" ADD COLUMN "patientMedicalRecordHash" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PatientMedicationRecords";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "patientDiagnosis";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "patientMedicines";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PatientMedicationRecord" (
    "medicationRecordsId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "medicine" TEXT NOT NULL,
    "medicalDataHash" TEXT,
    "timeStamp" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MedicalInstitutions" (
    "medicalInstitutionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "doctorDataHash" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DoctorInfo" (
    "doctorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medicalInstitutionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "icNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "authorizedPatientsHash" TEXT
);
INSERT INTO "new_DoctorInfo" ("category", "doctorId", "email", "gender", "icNumber", "name", "phoneNumber") SELECT "category", "doctorId", "email", "gender", "icNumber", "name", "phoneNumber" FROM "DoctorInfo";
DROP TABLE "DoctorInfo";
ALTER TABLE "new_DoctorInfo" RENAME TO "DoctorInfo";
CREATE UNIQUE INDEX "DoctorInfo_icNumber_key" ON "DoctorInfo"("icNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "PatientMedicationRecord_medicationRecordsId_key" ON "PatientMedicationRecord"("medicationRecordsId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalInstitutions_medicalInstitutionId_key" ON "MedicalInstitutions"("medicalInstitutionId");
