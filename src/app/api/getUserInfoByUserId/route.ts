import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPrime } from "crypto";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest) => {
  const prisma = new PrismaClient();

  try {
    const userid=req.query.userid;
    const a = await prisma.users.findUnique({
      where: {
        userId: Number(userid)
      }
    })
    // console.log(a)
    return NextResponse.json(a, { status: 200 });
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }

  
};
export const POST = async (req: NextRequest) => { }
