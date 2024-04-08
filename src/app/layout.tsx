import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import UsersIcon from "@mui/icons-material/People";

import { LogoutButton } from "@/app/components/LogoutButton";
// import PageTitle from "@/app/components/PageTitle";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BugReportIcon from "@mui/icons-material/BugReport";
export const metadata = {
  title: "Next.js MUI Starter Template",
  description: "Next.js App Router + Material UI v5 Starter Template",
};
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
const DRAWER_WIDTH = 240;

const LINKS = [
  { text: "主页", href: "/", icon: HomeIcon },
  { text: "医疗信息记录管理", href: "/records", icon: AssignmentIcon },
  { text: "医生管理", href: "/doctors", icon: MedicationLiquidIcon },
  { text: "病人管理", href: "/patients", icon: AccessibleIcon },
  { text: "医疗机构管理", href: "/medicalInstitutions", icon: AccountBalanceIcon},
  // { text: "用户管理", href: "/users", icon: SupervisedUserCircleIcon },
  { text: "系统测试", href: "/tests", icon: BugReportIcon },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            
            p: 3,
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
