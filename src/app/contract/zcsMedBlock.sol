// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract ZCSMedBlock {
    enum Role {
        PATIENT,
        DOCTOR,
        INSTITUTION
    }
    struct PatientInfo {
        Role role;
        string patientBase64Info;
        address[] authorizedInstitutions;
        address[] authorizedDoctors;
    }
    struct DoctorInfo {
        Role role;
        string doctorBase64Info;
    }
    struct MedicalInstitutionInfo {
        Role role;
        string insBase64Info;
    }
    struct PatientMedicalRecord {
        string recordBase64;
        address[] authorizedPatient;
        address[] authorizedInstitutions;
        address[] authorizedDoctors;
    }
    mapping(address => PatientInfo) Patients;
    event PatientInfoCreate(address add, uint256 timestamp);

    function addPatientInfo(string memory _pb64i) public {
        PatientInfo memory newPi;
        newPi.role = Role.PATIENT;
        newPi.patientBase64Info = _pb64i;
        Patients[msg.sender] = newPi;
        emit PatientInfoCreate(msg.sender, block.timestamp);
    }

    event PatientInfoReaded(address add, uint256 timestamp);

    function PatientInfoRead(address padd) public view returns (string memory) {
        bool authIns = false;
        bool authDoc = false;
        for (
            uint256 i = 0;
            i < Patients[padd].authorizedInstitutions.length;
            i++
        ) {
            if (Patients[padd].authorizedInstitutions[i] == msg.sender) {
                authIns = true;
            }
        }
        for (uint256 i = 0; i < Patients[padd].authorizedDoctors.length; i++) {
            if (Patients[padd].authorizedDoctors[i] == msg.sender) {
                authDoc = true;
            }
        }
        if (msg.sender == padd || authDoc || authIns) {
            return Patients[padd].patientBase64Info;
        }
        else{
            return ("Unauthorized");
        }
    }
    
}
