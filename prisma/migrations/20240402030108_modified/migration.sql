/*
  Warnings:

  - Made the column `icNumber` on table `Patient` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "allergy" TEXT,
    "currentMedication" TEXT,
    "emergentContactName" TEXT NOT NULL,
    "emergentContactPhoneNumber" TEXT NOT NULL
);
INSERT INTO "new_Patient" ("address", "allergy", "bloodGroup", "currentMedication", "email", "emergentContactName", "emergentContactPhoneNumber", "gender", "height", "icNumber", "id", "name", "occupation", "phoneNumber", "weight") SELECT "address", "allergy", "bloodGroup", "currentMedication", "email", "emergentContactName", "emergentContactPhoneNumber", "gender", "height", "icNumber", "id", "name", "occupation", "phoneNumber", "weight" FROM "Patient";
DROP TABLE "Patient";
ALTER TABLE "new_Patient" RENAME TO "Patient";
CREATE UNIQUE INDEX "Patient_icNumber_key" ON "Patient"("icNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
