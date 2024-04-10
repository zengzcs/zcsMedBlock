import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getSession, signOut } from "next-auth/react";

export async function checkAuth(req: NextRequest) {
    const session = await getSession()
    if (session.email == "ADMIN") {
    }
    else {
        signOut();
    }
}