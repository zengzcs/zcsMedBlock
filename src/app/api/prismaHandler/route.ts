import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPrime } from "crypto";
import easyGet from "@/app/lib/HandleGet";
import { NextApiRequest } from "next";

export const POST = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  const response = req.body;
  const reader = response.getReader();
  const { done, value } = await reader.read();
  const deciphertext = new TextDecoder().decode(value);
  const json = JSON.parse(deciphertext);
  console.log("json");
  console.log(json);
  try {
        const dbname = json.dbname;
        const info = eval(`await prisma.${dbname}.findMany()`);
        console.log(info);
    return NextResponse.json({ msg: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
};
