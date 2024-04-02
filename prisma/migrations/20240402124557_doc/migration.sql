/*
  Warnings:

  - Added the required column `email` to the `DoctorInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `DoctorInfo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DoctorInfo" (
    "doctorId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "icNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "authorizedPatientsStringify" TEXT
);
INSERT INTO "new_DoctorInfo" ("authorizedPatientsStringify", "category", "doctorId", "gender", "icNumber", "name") SELECT "authorizedPatientsStringify", "category", "doctorId", "gender", "icNumber", "name" FROM "DoctorInfo";
DROP TABLE "DoctorInfo";
ALTER TABLE "new_DoctorInfo" RENAME TO "DoctorInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
