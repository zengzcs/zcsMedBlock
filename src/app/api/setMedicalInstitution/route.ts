import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPrime } from "crypto";
export const GET = () => {
  return NextResponse.json({ msg: "OK" }, { status: 200 });
};
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
    const a = await prisma.medicalInstitutions.create({
      data: {
        name: json.name,
        region: json.region,
        grade: json.grade,
        
      },
    });

    const stringText = JSON.stringify(json);

    return NextResponse.json({ msg: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
};
