/*
  Warnings:

  - A unique constraint covering the columns `[icNumber]` on the table `DoctorInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DoctorInfo_icNumber_key" ON "DoctorInfo"("icNumber");
