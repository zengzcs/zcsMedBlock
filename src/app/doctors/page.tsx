"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { config } from "@/app/api/auth/[...nextauth]/route";
export default async function DoctorsPages() {
  const session = await getServerSession(config);

  if (!session) return <div>User not logged in</div>;
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
// import RegisterPatient from "@/app/components/RegisterPatiensPage";
import RegisterDoctor from "./RegisterDoctor";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
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

function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="医生信息概览" {...a11yProps(0)} />
          <Tab label="注册医生信息" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div>
          <RegisterDoctor></RegisterDoctor>
        </div>
      </CustomTabPanel>
    </Box>
  );
}
