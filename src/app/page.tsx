"use client";
// import { useSession } from "next-auth/react";
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
import { useRouter } from "next/router";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import AccessibleIcon from "@mui/icons-material/Accessible";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button, DialogContent } from "@mui/material";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import cryptoService from "./lib/crypto";
import styled from "styled-components";

const CenteredComponent = styled.div`
  display: flex;
  justify-content: center; // 水平居中
  align-items: center; // 垂直居中
  height: 100vh; // 容器高度，可根据需要调整
`;

import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";

export function LinearIndeterminate() {
  return (
    <Box sx={{ width: "40%" }}>
      <LinearProgress />
    </Box>
  );
}

export default async function Home() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const session = await getSession();
      console.log("延迟时间结束");
      console.log(session);
      console.log(session.user.name);

      const resultResponse = await fetch(
        "http://localhost:3000/api/verifyUser",
        {
          method: "POST",
          body: JSON.stringify({
            userid: session?.user.name,
            password: "1",
          }),
        }
      );

      {
        const result = await resultResponse;
        console.log("result.body");
        console.log(result.body);
        const reader = result.body.getReader();
        const { done, value } = await reader.read();
        const deciphertext = new TextDecoder().decode(value);
        console.log("deciphertext");
        console.log(deciphertext);
        const json = JSON.parse(deciphertext);
        const data = json.data;
        console.log("data");
        console.log(data);

        if (data.category == "ADMIN") {
          window.location.href = "/pages/admin  ";
        }
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <CenteredComponent>
        <LinearIndeterminate></LinearIndeterminate>
      </CenteredComponent>
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
