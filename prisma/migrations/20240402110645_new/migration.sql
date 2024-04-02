/*
  Warnings:

  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patientHash` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Patient";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "patientHash";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PatientPersonalInfo" (
    "patientId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT,
    "icNumber" TEXT NOT NULL,
    "email" TEXT,
    "gender" TEXT NOT NULL,
    "height" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "occupation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bloodGroup" TEXT,
    "allergies" TEXT NOT NULL,
    "emergentContactName" TEXT NOT NULL,
    "emergentContactPhoneNumber" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PatientMedicationRecords" (
    "patientId" INTEGER NOT NULL,
    "diagnosisHistoryStringify" TEXT NOT NULL,
    "medicineHistoryStringify" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "patientDiagnosis" (
    "patientDiagnosisId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "patientMedicines" (
    "patientMedicinesId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "doctorId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "timeStamp" DATETIME NOT NULL,
    "medicinesStringinify" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DoctorInfo" (
    "doctorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "icNumber" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "authorizedPatientsStringify" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientPersonalInfo_icNumber_key" ON "PatientPersonalInfo"("icNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PatientMedicationRecords_patientId_key" ON "PatientMedicationRecords"("patientId");
