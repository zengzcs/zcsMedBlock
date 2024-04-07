"use Server";
import Web3 from "web3";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";

// async function show() {
//   const pInfo = await getPatiensInfo();
//   let map: Map<string, string> = new Map();
//   for (var i of pInfo) {
//     map.set(i.patientId,i.name)
//   }
//   console.log(map);
//   const entries=Array.from(map.entries());
// }
var patientid = 1;
var doctorid = 1;
var institutionid=1
function handlePatientId(event) {
  patientid = event.target.value;
  alert(patientid)
}
function handleDoctorId(event) {
  doctorid = event.target.value;
}
function handleInstitutionId(event) {
  institutionid = event.target.value;
}





export default async function RegisterPatient() {

  let institutionMap: Map<string, string> = new Map();
  try {
    const responseInstitution = await fetch("/api/getMedicalInstitutionInfo", {
      method: "GET",
    });


    if (!responseInstitution.ok) {
      throw new Error(responseInstitution.statusText);

    }
    
    const dInfo = await responseInstitution.json();

    dInfo.forEach((insInfo) => {
      institutionMap.set(insInfo.medicalInstitutionId, insInfo.name);
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);

  }

  const institutionEntries = Array.from(institutionMap.entries());




  let map: Map<string, string> = new Map();
  let doctorMap: Map<string, string> = new Map();
  try {
    const responsePatient = await fetch("/api/getPatientsInfo", {
      method: "GET",
    });

    const responseDoctors = await fetch("/api/getDoctorInfo", {
      method: "GET",
    });
    if (!responsePatient.ok) {
      throw new Error(responsePatient.statusText);

    }
    if (!responseDoctors.ok) {
      throw new Error(`HTTP error! status: ${responseDoctors.status}`);

    }
    const dInfo = await responseDoctors.json();
    const pInfo = await responsePatient.json();

    dInfo.forEach((doctorInfo) => {
      doctorMap.set(doctorInfo.doctorId, doctorInfo.name);
    });
    pInfo.forEach((patientInfo) => {
      map.set(patientInfo.patientId, patientInfo.name);
  
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);

    
  }
  const entries = Array.from(map.entries());
  const doctorEntries = Array.from(doctorMap.entries());
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Alert severity="info">基本信息填写</Alert>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="patientSelected"
              select
              label="选择病人"
              onChange={handlePatientId}
              // defaultValue="beijing"
            >
              {entries.map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="doctorSelected"
              select
              label="选择医生"
              onChange={handleDoctorId}
              // defaultValue="beijing"
            >
              {doctorEntries.map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="institutionSelected"
              select
              label="选择机构"
              onChange={handleInstitutionId}
              // defaultValue="beijing"
            >
              {institutionEntries.map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
      </Grid>
      <Alert severity="info">注册密码</Alert>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "60ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="password"
              label="用户密码"
              type="password"
              autoComplete="current-password"
            />
            
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {" "}
        <Grid item>
          <Button variant="contained" endIcon={<SendIcon />} size="large">
            提交到数据库
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            size="large"
            // onClick={HandleCommitToBlockChain}
          >
            提交到Geth
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import HandleCommitToBlockChain from "../lib/HandleCommitToBlockChain";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
