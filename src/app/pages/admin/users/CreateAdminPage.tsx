"use Server";
import Web3 from "web3";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import gethInstance from "@/app/lib/getGethInstance";
// async function show() {
//   const pInfo = await getPatiensInfo();
//   let map: Map<string, string> = new Map();
//   for (var i of pInfo) {
//     map.set(i.patientId,i.name)
//   }
//   console.log(map);
//   const entries=Array.from(map.entries());
// }

export default async function RegisterAdmin() {
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
            <TextField required id="name" label="账户名称" defaultValue="" />
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
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            size="large"
            onClick={async () => {
              const data = {
                name: document.getElementById("name").value,
                password: document.getElementById("password").value,
              };
              const jsonPayload = await gethInstance.addAdminInfo(data);
              const a = await fetch("/api/setAdminInfo", {
                method: "POST",
                body: jsonPayload,
              });
              console.log(a);
              if (a.ok) {
                alert("提交成功");
              } else {
                alert("提交失败");
              }
            }}
          >
            提交
          </Button>
        </Grid>
        <Grid item></Grid>
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
