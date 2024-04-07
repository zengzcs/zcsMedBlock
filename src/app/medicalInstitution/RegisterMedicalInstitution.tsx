"use Server";
import Web3 from "web3";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
export default function RegisterMedicalInstitution() {
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
// import handleCommit from "./HandleCommit";
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
import { Prisma } from "@prisma/client";

const hospitalGrades = [
  {
    value: "thirdLevelA",
    label: "三级甲等",
  },
  {
    value: "thirdLevelB",
    label: "三级乙等",
  },
  {
    value: "thirdLevelC",
    label: "三级丙等",
  },
  {
    value: "secondLevelA",
    label: "二级甲等",
  },
  {
    value: "secondLevelB",
    label: "二级乙等",
  },
  {
    value: "secondLevelC",
    label: "二级丙等",
  },
  {
    value: "firstLevelA",
    label: "一级甲等",
  },
  {
    value: "firstLevelB",
    label: "一级乙等",
  },
  {
    value: "firstLevelC",
    label: "一级丙等",
  },

  {
    value: "privateOphthalmology",
    label: "民营眼科医院",
  },
  {
    value: "privateDentistry",
    label: "民营牙科医院",
  },
  {
    value: "townshipHealthcare",
    label: "乡镇医疗机构",
  },
  {
    value: "pharmacyWithHealthInsurance",
    label: "医保药店",
  },
  {
    value: "townshipPharmacy",
    label: "乡镇药店",
  },
  {
    value: "enterpriseHealthClinic",
    label: "国企/学校单位内部医院诊所",
  },
  {
    value: "militaryHealthClinic",
    label: "军队内部医院诊所",
  },
  {
    value: "privateHospital",
    label: "民营医院",
  },
  {
    value: "publicHospital",
    label: "公立医院",
  },
  {
    value: "communityHealthCenter",
    label: "社区卫生服务中心",
  },
  {
    value: "villageClinic",
    label: "村卫生室",
  },
  {
    value: "specializedHospital",
    label: "专科医院",
  },
  {
    value: "generalHospital",
    label: "综合医院",
  },
  {
    value: "traditionalChineseMedicineHospital",
    label: "中医医院",
  },
  {
    value: "rehabilitationCenter",
    label: "康复中心",
  },
  {
    value: "maternalAndChildHealthCare",
    label: "妇幼保健医院",
  },
  {
    value: "diseasePreventionCenter",
    label: "疾病预防控制中心",
  },
  {
    value: "emergencyCenter",
    label: "急救中心",
  },
];

const regionsInChina = [
  {
    value: "beijing",
    label: "北京",
  },
  {
    value: "shanghai",
    label: "上海",
  },
  {
    value: "anhui",
    label: "安徽",
  },
  {
    value: "fujian",
    label: "福建",
  },
  {
    value: "gansu",
    label: "甘肃",
  },
  {
    value: "guangdong",
    label: "广东",
  },
  {
    value: "guangxi",
    label: "广西",
  },
  {
    value: "guizhou",
    label: "贵州",
  },
  {
    value: "hainan",
    label: "海南",
  },
  {
    value: "hebei",
    label: "河北",
  },
  {
    value: "henan",
    label: "河南",
  },
  {
    value: "hubei",
    label: "湖北",
  },
  {
    value: "hunan",
    label: "湖南",
  },
  {
    value: "jiangsu",
    label: "江苏",
  },
  {
    value: "jiangxi",
    label: "江西",
  },
  {
    value: "jilin",
    label: "吉林",
  },
  {
    value: "liaoning",
    label: "辽宁",
  },
  {
    value: "neimenggu",
    label: "内蒙古",
  },
  {
    value: "ningxia",
    label: "宁夏",
  },
  {
    value: "qinghai",
    label: "青海",
  },
  {
    value: "shanxi",
    label: "山西",
  },
  {
    value: "sichuan",
    label: "四川",
  },
  {
    value: "tianjin",
    label: "天津",
  },
  {
    value: "xinjiang",
    label: "新疆",
  },
  {
    value: "xizang",
    label: "西藏",
  },
  {
    value: "yunnan",
    label: "云南",
  },
  {
    value: "zhejiang",
    label: "浙江",
  },
  {
    value: "chongqing",
    label: "重庆",
  },
  {
    value: "taiwan",
    label: "台湾",
  },
  {
    value: "xianggang",
    label: "香港",
  },
  {
    value: "macao",
    label: "澳门",
  },
  {
    value: "xinjiangBingTuan",
    label: "新疆兵团",
  },
  {
    value: "xinjiang",
    label: "新疆",
  },
  {
    value: "northeastMilitaryRegion",
    label: "北部战区",
  },
  {
    value: "northMilitaryRegion",
    label: "北部战区",
  },
  {
    value: "eastMilitaryRegion",
    label: "东部战区",
  },
  {
    value: "centralMilitaryRegion",
    label: "中部战区",
  },
  {
    value: "southMilitaryRegion",
    label: "南部战区",
  },
  {
    value: "westMilitaryRegion",
    label: "西部战区",
  },
];

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
              label="医疗机构名称"
              defaultValue=""
              variant="outlined"
            />

            <TextField
              id="regionsInChina"
              select
              label="所在地区"
              defaultValue="beijing"
            >
              {regionsInChina.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="hospitalGrade"
              select
              label="医疗机构类型"
              defaultValue="thirdLevelA"
            >
              {hospitalGrades.map((option) => (
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
            // onClick={HandleCommitToBlockChain}
          >
            提交到Geth
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}


  



async function handleCommit() {
  const Data = {
    name: document.getElementById("name")?.value,
    region: document.getElementById("regionsInChina")?.textContent,
    grade: document.getElementById("hospitalGrade")?.textContent,
  };
  const jsonPayload = JSON.stringify(Data);
  console.log(jsonPayload);
  const a = await fetch("/api/setMedicalInstitution", {
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
