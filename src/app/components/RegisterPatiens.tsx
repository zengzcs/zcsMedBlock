"use client";
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
import TextField from "@mui/material/TextField";
import { Autocomplete, Button, MenuItem } from "@mui/material";
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
const bloodTypes = [
  {
    value: "A",
    label: "A型",
  },
  {
    value: "B",
    label: "B型",
  },
  {
    value: "AB",
    label: "AB型",
  },
  {
    value: "O",
    label: "O型",
  },
  {
    value: "Rhnull",
    label: "Rhnull型（熊猫血）",
  },
  {
    value: "Rh",
    label: "Rh阳性",
  },

  {
    value: "MNSsU",
    label: "MNSSU型",
  },
  {
    value: "Duffy",
    label: "Duffy型",
  },
  {
    value: "Kell",
    label: "Kell型",
  },
];

async function loadWeb3() {
  //---if MetaMask is available on your web browser---
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    //---connect to account---
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(account);
  } else {
    //---set the provider you want from Web3.providers---
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }
}
//---get the current account in MetaMask---
async function getCurrentAccount() {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts);
  return accounts[0];
}
async function load() {
  await loadWeb3();
  alert(await getCurrentAccount());
}

function handleCommit() {
  load();
}
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
              id="outlined-name"
              label="姓名"
              defaultValue=""
              variant="outlined"
            />
            <TextField
              required
              id="outlined-required"
              label="身份证号"
              defaultValue=""
            />

            <TextField
              required
              id="outlined-phoneNumber"
              label="电话号码"
              defaultValue=""
              variant="outlined"
            />

            <TextField
              required
              id="outlined-occupation"
              label="职业"
              defaultValue=""
              variant="outlined"
            />

            <TextField
              id="outlined-email"
              label="电子邮件"
              defaultValue=""
              variant="outlined"
            />

            <TextField
              id="outlined-select-currency"
              select
              label="性别"
              defaultValue="男"
            >
              {sexies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-height"
              label="身高（cm）"
              type="number"
              defaultValue="175"
              variant="outlined"
            />

            <TextField
              id="outlined-weight"
              label="体重（kg）"
              type="number"
              defaultValue="75"
              variant="outlined"
            />

            <TextField
              id="outlined-bloodGroup"
              label="血型"
              select
              defaultValue=""
              variant="outlined"
            >
              {bloodTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              {/* <MenuItem value="">
                  <em>请选择血型</em>
                </MenuItem> */}
              {/* 血型选项根据实际情况添加 */}
            </TextField>
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-address"
              label="居住地址"
              defaultValue=""
              variant="outlined"
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Alert severity="info">病史信息填写</Alert>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-current"
              label="当前用药"
              multiline
              rows={3}
              defaultValue=""
              variant="outlined"
            />

            <TextField
              id="outlined-allergy"
              label="过敏史"
              multiline
              rows={3}
              defaultValue=""
              variant="outlined"
            />

            <TextField
              required
              id="outlined-emergentContactName"
              label="紧急联系人姓名"
              defaultValue=""
              variant="outlined"
            />

            <TextField
              required
              id="outlined-emergentContactPhoneNumber"
              label="紧急联系人电话"
              type="tel"
              defaultValue=""
              variant="outlined"
            />
          </Box>
        </Grid>
      </Grid>
      <center>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          size="large"
          onClick={handleCommit}
        >
          提交
        </Button>
      </center>
    </Box>
  );
}
