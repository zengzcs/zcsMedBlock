/*
  Warnings:

  - You are about to drop the column `allergies` on the `PatientPersonalInfo` table. All the data in the column will be lost.
  - Added the required column `allergiesHistory` to the `PatientPersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diagnosisHistory` to the `PatientPersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PatientPersonalInfo" (
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
    "allergiesHistory" TEXT NOT NULL,
    "diagnosisHistory" TEXT NOT NULL,
    "emergentContactName" TEXT NOT NULL,
    "emergentContactPhoneNumber" TEXT NOT NULL
);
INSERT INTO "new_PatientPersonalInfo" ("address", "bloodGroup", "email", "emergentContactName", "emergentContactPhoneNumber", "gender", "height", "icNumber", "name", "occupation", "patientId", "phoneNumber", "weight") SELECT "address", "bloodGroup", "email", "emergentContactName", "emergentContactPhoneNumber", "gender", "height", "icNumber", "name", "occupation", "patientId", "phoneNumber", "weight" FROM "PatientPersonalInfo";
DROP TABLE "PatientPersonalInfo";
ALTER TABLE "new_PatientPersonalInfo" RENAME TO "PatientPersonalInfo";
CREATE UNIQUE INDEX "PatientPersonalInfo_icNumber_key" ON "PatientPersonalInfo"("icNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
