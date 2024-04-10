import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPrime } from "crypto";

export const GET = async (req: NextRequest) => {
  const prisma = new PrismaClient();

  try {
    const a = await prisma.admins.findMany()
    console.log(a)
    return NextResponse.json(a, { status: 200 });
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }

  
};
export const POST = async (req: NextRequest) => { }
