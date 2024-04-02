"use Server";
import Web3 from "web3";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
export default function RegisterPatient() {
  return (
    <div>
      <BasicGrid></BasicGrid>
    </div>
  );
}
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import handleCommit from "./HandleCommit";
import HandleCommitToBlockChain from "../lib/HandleCommitToBlockChain";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
import TextField from "@mui/material/TextField";
import { Autocomplete, Button, MenuItem } from "@mui/material";
import { Prisma } from "@prisma/client";
const sexies = [
  {
    value: "男",
    label: "男",
  },

  {
    value: "女",
    label: "女",
  },
];
const doctorCategories = {
  内科医生: "Internist",
  外科医生: "Surgeon",
  儿科医生: "Pediatrician",
  妇产科医生: "Obstetrician-Gynecologist",
  眼科医生: "Ophthalmologist",
  耳鼻喉科医生: "Otorhinolaryngologist",
  皮肤科医生: "Dermatologist",
  精神科医生: "Psychiatrist",
  急诊科医生: "Emergency Physician",
  麻醉科医生: "Anesthesiologist",
  放射科医生: "Radiologist",
  病理科医生: "Pathologist",
  肿瘤科医生: "Oncologist",
  心血管科医生: "Cardiologist",
  神经科医生: "Neurologist",
  骨科医生: "Orthopedist",
  泌尿科医生: "Urologist",
  内分泌科医生: "Endocrinologist",
  消化科医生: "Gastroenterologist",
  呼吸科医生: "Pulmonologist",
  感染科医生: "Infectious Disease Specialist",
  康复医学科医生: "Rehabilitation Medicine Specialist",
  中医医生: "Traditional Chinese Medicine Practitioner",
  牙科医生: "Dentist",
};

const doctorsArray = Object.entries(doctorCategories).map(([key, value]) => {
  return {
    value: value,
    label: key,
  };
});

function BasicGrid() {
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
              required
              id="name"
              label="姓名"
              defaultValue=""
              variant="outlined"
            />
            <TextField
              required
              id="icNumber"
              label="身份证号"
              defaultValue=""
            />

            <TextField
              required
              id="phoneNumber"
              label="电话号码"
              defaultValue=""
              variant="outlined"
            />

            <TextField
              id="occupation"
              select
              label="专业"
              defaultValue="Internist"
            >
              {doctorsArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="email"
              label="电子邮件"
              defaultValue=""
              variant="outlined"
            />

            <TextField id="sex" select label="性别" defaultValue="男">
              {sexies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {" "}
        {/* 间隔为 24px */}
        <Grid item>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            size="large"
            onClick={handleCommit}
          >
            提交到数据库
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            size="large"
            onClick={HandleCommitToBlockChain}
          >
            提交到Geth
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
