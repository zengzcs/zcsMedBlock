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
function handlePatientId(event) {
  patientid = event.target.value;
}
function handleDoctorId(event) {
  doctorid = event.target.value;
}
function handleChange(event) {
  id = event.target.value;
}
export default async function PatientAuthorizePage() {
    let dmap: Map<string, string> = new Map();

    try {
      const response = await fetch("/api/getMedicalInstitutionInfo", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const Info = await response.json();

      Info.forEach((i) => {
        dmap.set(i.medicalInstitutionId, i.name);
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    const dentries = Array.from(dmap.entries());

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
      <Alert severity="info">选择授权对象</Alert>
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
              id="MedicalInstitutionSelected"
              select
              label="选择医疗机构"
              onChange={handleChange}
              // defaultValue="beijing"
            >
              {dentries.map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {" "}
        <Grid item>
          <Button variant="contained" endIcon={<SendIcon />} size="large">
            授权
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
