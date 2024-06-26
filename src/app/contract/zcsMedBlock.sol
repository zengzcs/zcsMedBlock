// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.18 <0.9.0;

import "hardhat/console.sol";

contract ZCSMedBlock {
    function toString(address account) public pure returns (string memory) {
        return toString(abi.encodePacked(account));
    }

    function toString(uint256 value) public pure returns (string memory) {
        return toString(abi.encodePacked(value));
    }

    function toString(bytes32 value) public pure returns (string memory) {
        return toString(abi.encodePacked(value));
    }

    function toString(bytes memory data) public pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(2 + data.length * 2);
        str[0] = "0";
        str[1] = "x";
        for (uint256 i = 0; i < data.length; i++) {
            str[2 + i * 2] = alphabet[uint256(uint8(data[i] >> 4))];
            str[3 + i * 2] = alphabet[uint256(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }

    enum Role {
        PATIENT,
        DOCTOR,
        INSTITUTION,
        ADMIN
    }
    struct AdminInfo{
        Role role;
        string adminBase64Info;
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
        address[] authorizedInstitutions;
        address[] authorizedDoctors;
    }
    mapping(address => PatientInfo) Patients;
    mapping(address=>DoctorInfo)Doctors;
    mapping(address=>MedicalInstitutionInfo)MedicalInstitutions;
    mapping(address=>AdminInfo)Admins;

    event PatientInfoCreate(address add, uint256 timestamp);

    function addAdminInfo(string memory _pb64i) public {
        AdminInfo memory newPi;
        newPi.role = Role.PATIENT;
        newPi.adminBase64Info = _pb64i;
        Admins[msg.sender] = newPi;
        console.log(msg.sender);
        emit PatientInfoCreate(msg.sender, block.timestamp);
    }
    function addPatientInfo(string memory _pb64i) public {
        PatientInfo memory newPi;
        newPi.role = Role.PATIENT;
        newPi.patientBase64Info = _pb64i;
        Patients[msg.sender] = newPi;
        console.log(msg.sender);
        emit PatientInfoCreate(msg.sender, block.timestamp);
    }

    function addDoctorInfo(string memory _pb64i) public {
        DoctorInfo memory newPi;
        newPi.role = Role.DOCTOR;
        newPi.doctorBase64Info = _pb64i;
        Doctors[msg.sender] = newPi;
        console.log(msg.sender);
        emit PatientInfoCreate(msg.sender, block.timestamp);
    }
    function addMedicalInstitutionInfo(string memory _pb64i) public {
        MedicalInstitutionInfo memory newPi;
        newPi.role = Role.INSTITUTION;
        newPi.insBase64Info = _pb64i;
        MedicalInstitutions[msg.sender] = newPi;
        console.log(msg.sender);
        emit PatientInfoCreate(msg.sender, block.timestamp);
    }

    event PatientInfoReaded(address add, uint256 timestamp);

    function PatientInfoRead(address padd) public view returns (string memory) {
        console.log(msg.sender);
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
        } else {
            return (toString(abi.encodePacked(msg.sender)));
        }
    }

    function patientAuthorizeDoctorInfo(address padd, address dadd)
        public
        returns (string memory)
    {
        for (uint256 i = 0; i < Patients[padd].authorizedDoctors.length; i++) {
            if (Patients[padd].authorizedDoctors[i] == dadd) {
                return ("repete");
            }
        }
        Patients[padd].authorizedDoctors.push(dadd);
        return ("succeed");
    }

    function patientRevokeAuthorizationDoctorInfo(address padd, address dadd)
        public
        returns (string memory)
    {
        for (uint256 i = 0; i < Patients[padd].authorizedDoctors.length; i++) {
            if (Patients[padd].authorizedDoctors[i] == dadd) {
                Patients[padd].authorizedDoctors[i] = address(padd);
                return ("done");
            }
        }
        return ("not found");
    }

    function patientAuthorizeInstitution(address padd, address iadd)
        public
        returns (string memory)
    {
        for (
            uint256 i = 0;
            i < Patients[padd].authorizedInstitutions.length;
            i++
        ) {
            if (Patients[padd].authorizedInstitutions[i] == iadd) {
                return ("repete");
            }
        }
        Patients[padd].authorizedInstitutions.push(iadd);
        return ("succeed");
    }

    function testConnection() public pure returns (string memory) {
        return "connected";
    }
}
