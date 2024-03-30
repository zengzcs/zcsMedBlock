-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT,
    "icNumber" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "Patient_phoneNumber_key" ON "Patient"("phoneNumber");
