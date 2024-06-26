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
    const a = await prisma.patients.update({
      where: {
        userId: Number(json.patientId),
      },
      data: {
        authorizedDoctorsId: {
          push:[Number(json.doctorId)]
        }
      },
    });

    return NextResponse.json({ msg: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
};
