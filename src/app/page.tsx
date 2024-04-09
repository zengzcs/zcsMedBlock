"use client"

import Image from "next/image";
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

import { LogoutButton } from "@/app/components/LogoutButton"

import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button, DialogContent } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import cryptoService from "./lib/crypto";

export default function Home() {

  return (
    <div>
      <Button onClick={() => {
        test()
      }}>
        测试
      </Button>  
      <LogoutButton></LogoutButton>
    </div>
  );
}
async function test() {
  const resultResponse = await fetch("http://localhost:3000/api/verifyUser", {
    method: "POST",
    body: JSON.stringify({
      userid: 1,
      password: "zhao",
    }),
  });
  console.log(await resultResponse);
  const result = await resultResponse.json();
  console.log(result);
}
