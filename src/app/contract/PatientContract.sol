// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
contract Patient {
    struct base64Record {
        string base64Info;
    }
    mapping(address => base64Record) public base64Patients;

    event PatientRecordAdd(address indexed patient, uint timestamp);
    function store(string memory _base64Info) public {
        base64Record memory newRecord;
        console.log(_base64Info);
        console.log(msg.sender);
        newRecord.base64Info = _base64Info;
        base64Patients[msg.sender] = newRecord;
        console.log(base64Patients[msg.sender].base64Info);
        emit PatientRecordAdd(msg.sender, block.timestamp);
    }
    function get() public view returns (base64Record memory) {
        console.log(msg.sender);
        console.log(base64Patients[msg.sender].base64Info);
        return (base64Patients[msg.sender]);
    }
}
