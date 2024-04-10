"use client"
import { Button } from "@mui/material";
import { getSession } from "next-auth/react";

export default function AdminHoe() {
    return (<div>
        <Button onClick={() => {
            const session = getSession()
            console.log(session)
        }}>测试</Button>
    </div>)
}