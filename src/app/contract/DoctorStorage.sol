// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract DoctorStorage{
    string doctorInfo;
    function store(string memory info) public{
        doctorInfo=info;

    }
    function retrieve() public view returns(string memory){
        return doctorInfo;
    }
}