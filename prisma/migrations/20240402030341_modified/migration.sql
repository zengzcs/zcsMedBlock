-- CreateTable
CREATE TABLE "patientHash" (
    "id" INTEGER NOT NULL,
    "icNumber" TEXT NOT NULL,
    "hash" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "patientHash_id_key" ON "patientHash"("id");

-- CreateIndex
CREATE UNIQUE INDEX "patientHash_icNumber_key" ON "patientHash"("icNumber");

-- CreateIndex
CREATE UNIQUE INDEX "patientHash_hash_key" ON "patientHash"("hash");
