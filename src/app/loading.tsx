"use client";
import { Box, LinearProgress } from "@mui/material";
import styled from "styled-components";

export function LinearIndeterminate() {
  return (
    <Box sx={{ width: "40%" }}>
      <LinearProgress />
      <span>加载中...</span>
    </Box>
  );
}
export default function loading() {
  const CenteredComponent = styled.div`
    display: flex;
    justify-content: center; // 水平居中
    align-items: center; // 垂直居中
    height: 100vh; // 容器高度，可根据需要调整
  `;
  return (
    <div>
      <CenteredComponent>
        <LinearIndeterminate></LinearIndeterminate>
      </CenteredComponent>
    </div>
  );
}
