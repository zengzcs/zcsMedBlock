"use Server";
import { Base64 } from "js-base64";

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

// import HandleCommitToBlockChain from "../lib/HandleCommitToBlockChain";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
import TextField from "@mui/material/TextField";
import { Autocomplete, Button, MenuItem } from "@mui/material";
import gethInstance from "@/app/lib/getGethInstance";";

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
const commonOccupationsExtended = [
  {
    value: "doctor",
    label: "医生",
  },
  {
    value: "teacher",
    label: "教师",
  },
  {
    value: "engineer",
    label: "工程师",
  },
  {
    value: "programmer",
    label: "程序员",
  },
  {
    value: "accountant",
    label: "会计",
  },
  {
    value: "salesperson",
    label: "销售员",
  },
  {
    value: "designer",
    label: "设计师",
  },
  {
    value: "constructionWorker",
    label: "建筑工人",
  },
  {
    value: "factoryWorker",
    label: "工厂工人",
  },
  {
    value: "mechanic",
    label: "技工",
  },
  {
    value: "electrician",
    label: "电工",
  },
  {
    value: "plumber",
    label: "管道工",
  },
  {
    value: "farmer",
    label: "农民",
  },
  {
    value: "waiter",
    label: "服务员",
  },
  {
    value: "cashier",
    label: "收银员",
  },
  {
    value: "janitor",
    label: "清洁工",
  },
  {
    value: "driver",
    label: "司机",
  },
  {
    value: "securityGuard",
    label: "保安",
  },
  {
    value: "nurse",
    label: "护士",
  },
  {
    value: "officeClerk",
    label: "办公室文员",
  },
  {
    value: "entrepreneur",
    label: "企业家",
  },
  {
    value: "chef",
    label: "厨师",
  },
  {
    value: "artist",
    label: "艺术家",
  },
  {
    value: "athlete",
    label: "运动员",
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
              label="职业"
              defaultValue="doctor"
            >
              {commonOccupationsExtended.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="email"
              type="email"
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

            <TextField
              id="height"
              label="身高（cm）"
              type="number"
              defaultValue="175"
              variant="outlined"
            />

            <TextField
              id="weight"
              label="体重（kg）"
              type="number"
              defaultValue="75"
              variant="outlined"
            />

            <TextField
              id="bloodGroup"
              required
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
              id="password"
              label="用户密码"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              required
              id="address"
              label="居住地址"
              defaultValue=""
              variant="outlined"
            />
            <TextField
              required
              id="emergentContactName"
              label="紧急联系人姓名"
              defaultValue=""
              variant="outlined"
            />

            <TextField
              required
              id="emergentContactPhoneNumber"
              label="紧急联系人电话"
              type="tel"
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
              id="medications"
              label="过往病史"
              multiline
              rows={3}
              defaultValue=""
              variant="outlined"
            />

            <TextField
              id="allergies"
              label="过敏史"
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
          {/* </Grid>
        <Grid item>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            size="large"
            onClick={addPatientInfo_toBlockChain}
          >
            提交到Geth
          </Button> */}
        </Grid>
      </Grid>
    </Box>
  );
}
async function handleCommit() {
  const PatientPersonalInfoData = {
    name: document.getElementById("name").value,
    icNumber: document.getElementById("icNumber").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    occupation: document.getElementById("occupation").textContent,
    email: document.getElementById("email").value,
    gender: document.getElementById("sex").textContent,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    bloodGroup: document.getElementById("bloodGroup").textContent,
    address: document.getElementById("address").value,
    emergentContactName: document.getElementById("emergentContactName").value,
    emergentContactPhoneNumber: document.getElementById(
      "emergentContactPhoneNumber"
    ).value,
    medications: document.getElementById("medications").value,
    allergies: document.getElementById("allergies").value,
    password: document.getElementById("password").value,
  };
  const jsonPayload = await gethInstance.addPatientInfo(
    PatientPersonalInfoData
  );
  const a = await fetch("/api/setPatientsInfo", {
    method: "POST",
    body: jsonPayload,
  });
  console.log(a);
  if (a.ok) {
    alert("提交成功");
  } else {
    alert("提交失败");
  }
}
