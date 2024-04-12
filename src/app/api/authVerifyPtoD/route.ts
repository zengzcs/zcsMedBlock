import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPrime } from "crypto";
import cryptoService from "../../lib/crypto";
import nextReqService from "../../lib/nextReq";
import { autocompleteClasses } from "@mui/material";
export const GET = () => {
  return NextResponse.json({ msg: "OK" }, { status: 200 });
};
export const POST = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  const json = await nextReqService.parseReqBody(req);
  console.log(json);
  try {
    const a = await prisma.patients.findUnique({
      where: {
        userId: Number(json.patientId),
      },
    });
    console.log("doctorId");
    console.log(json.doctorId);
    console.log("authorizedDoctorsId");
    console.log(a.authorizedDoctorsId);
    if (a?.authorizedDoctorsId.includes(Number(json.doctorId))) {
      return NextResponse.json({ msg: "ok", replete: true }, { status: 200 });
    } else {
      return NextResponse.json({ msg: "ok", replete: false }, { status: 200 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
};
