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
  title: "基于区块链的医疗信息管理系统",
  description: "Author:曾朝 github: https://github.com/zengzcs/zcsMedBlock.git",
};
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
const DRAWER_WIDTH = 240;

const LINKS = [
  { text: "主页", href: "/pages/admin", icon: HomeIcon },
  {
    text: "医疗信息记录管理",
    href: "/pages/admin/records",
    icon: AssignmentIcon,
  },
  {
    text: "医生管理",
    href: "/pages/admin/doctors",
    icon: MedicationLiquidIcon,
  },
  { text: "病人管理", href: "/pages/admin/patients", icon: AccessibleIcon },
  {
    text: "医疗机构管理",
    href: "/pages/admin/medicalInstitutions",
    icon: AccountBalanceIcon,
  },
  { text: "用户管理", href: "/pages/admin/users", icon: SupervisedUserCircleIcon },
  { text: "系统测试", href: "/pages/admin/tests", icon: BugReportIcon },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppBar position="fixed" sx={{ zIndex: 2000 }}>
          <Toolbar sx={{ backgroundColor: "background.paper" }}>
            <DashboardIcon
              sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}
            />
            <Typography variant="h6" color="text.primary">
              基于区块链的医疗信息管理系统 病人平台
            </Typography>
            <Box
              sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}
            >
              {/* <PageTitle /> */}
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              top: ["48px", "56px", "64px"],
              height: "auto",
              bottom: 0,
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Divider />
          <List>
            {LINKS.map(({ text, href, icon: Icon }) => (
              <ListItem key={href} disablePadding>
                <ListItemButton component={Link} href={href}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ mt: "auto" }} />
          <List>
            <LogoutButton />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            ml: `${DRAWER_WIDTH}px`,
            mt: ["48px", "56px", "64px"],
            p: 3,
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
