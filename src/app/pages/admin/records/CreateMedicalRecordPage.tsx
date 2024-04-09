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

export default async function RegisterPatient() {
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
          </Box>
        </Grid>
      </Grid>
      <Alert severity="info">记录信息填写</Alert>
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
              id="diagnosis"
              label="诊断结果"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
            />
            <TextField
              id="medicine"
              label="处方"
              multiline
              rows={4}
              defaultValue=""
              variant="outlined"
            />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "55ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="medicalDataHash"
              label="上传医疗数据"
              multiline
              rows={3}
              defaultValue=""
              variant="outlined"
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
