import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPrime } from "crypto";
import cryptoService from "../../lib/crypto";
import nextReqService from "../../lib/nextReq";
export const GET = () => {
  return NextResponse.json({ msg: "OK" }, { status: 200 });
};
export const POST = async (req: NextRequest) => {
  const prisma = new PrismaClient();
  const json=await nextReqService.parseReqBody(req);
  try {
    const a = await prisma.patients.update({
      where: {
        patientId: Number(json.patientId),
      },
      data: {
        doctorAuthorized: { connect: { doctorId: Number(json.doctorId) } },
      },
    });
    const stringText = JSON.stringify(json);

    return NextResponse.json({ msg: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
};
