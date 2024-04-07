-- CreateTable
CREATE TABLE "Patients" (
    "patientId" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "name" TEXT,
    "icNumber" TEXT NOT NULL,
    "email" TEXT,
    "gender" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "occupation" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bloodGroup" TEXT,
    "allergiesHistory" TEXT NOT NULL,
    "diagnosisHistory" TEXT NOT NULL,
    "emergentContactName" TEXT NOT NULL,
    "emergentContactPhoneNumber" TEXT NOT NULL,
    "doctorDoctorId" INTEGER,

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("patientId")
);

-- CreateTable
CREATE TABLE "PatientMedicationRecord" (
    "medicationRecordsId" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "medicine" TEXT NOT NULL,
    "medicalDataHash" TEXT,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "docterId" INTEGER NOT NULL,

    CONSTRAINT "PatientMedicationRecord_pkey" PRIMARY KEY ("medicationRecordsId")
);

-- CreateTable
CREATE TABLE "MedicalInstitutions" (
    "medicalInstitutionId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "MedicalInstitutions_pkey" PRIMARY KEY ("medicalInstitutionId")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "doctorId" SERIAL NOT NULL,
    "medicalInstitutionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "icNumber" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("doctorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patients_icNumber_key" ON "Patients"("icNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PatientMedicationRecord_medicationRecordsId_key" ON "PatientMedicationRecord"("medicationRecordsId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalInstitutions_medicalInstitutionId_key" ON "MedicalInstitutions"("medicalInstitutionId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_icNumber_key" ON "Doctor"("icNumber");

-- AddForeignKey
ALTER TABLE "Patients" ADD CONSTRAINT "Patients_doctorDoctorId_fkey" FOREIGN KEY ("doctorDoctorId") REFERENCES "Doctor"("doctorId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedicationRecord" ADD CONSTRAINT "PatientMedicationRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("patientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedicationRecord" ADD CONSTRAINT "PatientMedicationRecord_docterId_fkey" FOREIGN KEY ("docterId") REFERENCES "Doctor"("doctorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_medicalInstitutionId_fkey" FOREIGN KEY ("medicalInstitutionId") REFERENCES "MedicalInstitutions"("medicalInstitutionId") ON DELETE RESTRICT ON UPDATE CASCADE;
