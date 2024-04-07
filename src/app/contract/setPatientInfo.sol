// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract SetPatientInfo{
    struct base64Record{
        string base64Info;
    }
    mapping(address=>base64Record) public base64Patients;

    event PatientRecordAdd(address indexed patient,uint timestamp);
    function store(string memory _base64Info) public{
        base64Record memory newRecord;
        newRecord.base64Info=_base64Info;
        base64Patients[msg.sender]=newRecord;
        emit PatientRecordAdd(msg.sender, block.timestamp);
    }
    event PatientRecordUpdate(address indexed patient,uint timestamp);
    function update(string memory _base64Info) public{
        base64Record storage existingRecord=base64Patients[msg.sender];
        existingRecord.base64Info=_base64Info;
        emit PatientRecordUpdate(msg.sender, block.timestamp);
    }
    
}