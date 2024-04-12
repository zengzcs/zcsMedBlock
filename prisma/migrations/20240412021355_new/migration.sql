-- DropForeignKey
ALTER TABLE "Patients" DROP CONSTRAINT "Patients_doctorDoctorId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "patientsPatientId" INTEGER;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_patientsPatientId_fkey" FOREIGN KEY ("patientsPatientId") REFERENCES "Patients"("patientId") ON DELETE SET NULL ON UPDATE CASCADE;
