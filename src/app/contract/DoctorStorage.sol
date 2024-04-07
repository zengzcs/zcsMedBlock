pragma solidity ^0.8.0;

contract PatientRecords {
    struct Record {
        string name;
        string phoneNumber;
        string icNumber;
        string email;
        string gender;
        uint height;
        uint weight;
        string occupation;
        string paddress;
        string bloodGroup;
        string allergiesHistory;
        string diagnosisHistory;
        string emergentContactName;
        string emergentContactPhoneNumber;
        string password;
    }

    mapping(address => Record) public patientRecords;

    event RecordAdded(address indexed patient, uint timestamp);
    event RecordUpdated(address indexed patient, uint timestamp);

    function addRecord(
        string memory _name,
        string memory _phoneNumber,
        string memory _icNumber,
        string memory _email,
        string memory _gender,
        uint _height,
        uint _weight,
        string memory _occupation,
        string memory _paddress,
        string memory _bloodGroup,
        string memory _allergiesHistory,
        string memory _diagnosisHistory,
        string memory _emergentContactName,
        string memory _emergentContactPhoneNumber,
        string memory _password
    ) public {
        Record memory newRecord;
        newRecord.name = _name;
        newRecord.phoneNumber = _phoneNumber;
        newRecord.icNumber = _icNumber;
        newRecord.email = _email;
        newRecord.gender = _gender;
        newRecord.height = _height;
        newRecord.weight = _weight;
        newRecord.occupation = _occupation;
        newRecord.paddress = _paddress;
        newRecord.bloodGroup = _bloodGroup;
        newRecord.allergiesHistory = _allergiesHistory;
        newRecord.diagnosisHistory = _diagnosisHistory;
        newRecord.emergentContactName = _emergentContactName;
        newRecord.emergentContactPhoneNumber = _emergentContactPhoneNumber;
        newRecord.password = _password;

        patientRecords[msg.sender] = newRecord;
        emit RecordAdded(msg.sender, block.timestamp);
    }

    function updateRecord(
        string memory _name,
        string memory _phoneNumber,
        string memory _icNumber,
        string memory _email,
        string memory _gender,
        uint _height,
        uint _weight,
        string memory _occupation,
        string memory _paddress,
        string memory _bloodGroup,
        string memory _allergiesHistory,
        string memory _diagnosisHistory,
        string memory _emergentContactName,
        string memory _emergentContactPhoneNumber,
        string memory _password
    ) public {
        Record storage existingRecord = patientRecords[msg.sender];
        existingRecord.name = _name;
        existingRecord.phoneNumber = _phoneNumber;

        existingRecord.icNumber = _icNumber;
        existingRecord.email = _email;
        existingRecord.gender = _gender;
        existingRecord.height = _height;
        existingRecord.weight = _weight;
        existingRecord.occupation = _occupation;
        existingRecord.paddress = _paddress;
        existingRecord.bloodGroup = _bloodGroup;
        existingRecord.allergiesHistory = _allergiesHistory;
        existingRecord.diagnosisHistory = _diagnosisHistory;
        existingRecord.emergentContactName = _emergentContactName;
        existingRecord.emergentContactPhoneNumber = _emergentContactPhoneNumber;
        existingRecord.password = _password;

        emit RecordUpdated(msg.sender, block.timestamp);
    }

    // 函数来获取病人信息，可能需要考虑隐私保护
    function getPatientRecord(
        address patient
    ) public view returns (Record memory) {
        return patientRecords[patient];
    }
}
