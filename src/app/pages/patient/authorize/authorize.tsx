"use client";

import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import authInstance from "@/app/lib/authorize";


import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { getSession } from "next-auth/react";

var doctorid = 0;
var InstitutionId = 0;
function handleDoctorId(event) {
  doctorid = event.target.value;
}
function handleChange(event) {
  InstitutionId = event.target.value;
}
export default async function PatientAuthorizePage(props) {
  const [docavia, setDocavaia] = React.useState(false);
  const [insavai, setInsavai] = React.useState(true);
  const session = await getSession();
  const patientId = session.user.name;

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
      dmap.set(i.userId, i.name);
    });
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
  const dentries = Array.from(dmap.entries());

  let doctorMap: Map<string, string> = new Map();

  const responseDoctors = await fetch("/api/getDoctorInfo", {
    method: "GET",
  });

  if (!responseDoctors.ok) {
    throw new Error(`HTTP error! status: ${responseDoctors.status}`);
  }
  const dInfo = await responseDoctors.json();

  dInfo.forEach((doctorInfo) => {
    doctorMap.set(doctorInfo.userId, doctorInfo.name);
  });

  const doctorEntries = Array.from(doctorMap.entries());
  function TButton() {
    const [alignment, setAlignment] = React.useState("web");

    const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string
    ) => {
      setAlignment(newAlignment);
    };

    return (
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton
          value="doctor"
          onClick={() => {
            setInsavai(true);
            setDocavaia(false);
          }}
        >
          授权给医生
        </ToggleButton>
        <ToggleButton
          value="institution"
          onClick={() => {
            setInsavai(false);
            setDocavaia(true);
          }}
        >
          授权给机构
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Alert severity="info">选择授权对象</Alert>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {" "}
            <Grid item>
              <TButton />
            </Grid>
            <Grid item></Grid>
          </Grid>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="doctorSelected"
              select
              label="选择医生"
              disabled={docavia}
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
              disabled={insavai}
              onChange={handleChange}
              // defaultValue="beijing"
            >
              {dentries.map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
            <Grid container spacing={3}>
              {" "}
              {/* 间隔为 24px */}
              <Grid item>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  size="large"
                  onClick={async () => {
                    const result=
                    await authInstance.patientAuthorizeToDoctor(
                      Number.parseInt(String(patientId)),
                      doctorid
                      );
                    console.log(result);
                    if (result == "replete") {
                      alert("医生已授权给该患者");
                    }

                  }}
                >
                  授权
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
