"use client";
export default function DoctorsPages() {
  return (
    <div>
      <BasicTabs></BasicTabs>
    </div>
  );
}

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PatientAuthorizePage from "./authorize";
import { Button, Grid } from "@mui/material";
import AuthTable from "./table/AuthTable";
import { getSession } from "next-auth/react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

async function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="个人授权信息管理" {...a11yProps(0)} />
          <Tab label="授权" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}></CustomTabPanel>
      <AuthTable></AuthTable>
      <CustomTabPanel value={value} index={1}>
        <div>
          <PatientAuthorizePage></PatientAuthorizePage>
        </div>
      </CustomTabPanel>
      
    </Box>
  );
}
