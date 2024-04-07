// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
contract GetPatientInfo{
    struct base64Record{
        string base64Info;
    }
    mapping(address=>base64Record) public base64Patients;
    function get() public view returns(base64Record memory){
        return(base64Patients[msg.sender]);
    }
}