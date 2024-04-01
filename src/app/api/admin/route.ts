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
  const { done, value } = await reader.read()
  const deciphertext = new TextDecoder().decode(value)
  const json = JSON.parse(deciphertext)
  console.log("json")
  console.log(json)

  // const a = await prisma.patient.create({
  //   data: {
  //     phoneNumber: json.phoneNumber,
  // name:json.name,
  // icNumber:json.icNumber,
  // email:json.email,
  // gender:json.gender
  // height Float
  // weight Float
  // occupation String
  // address String
  // bloodGroup String?
  // allergy String?
  // currentMedication String?
  // emergentContactName String
  // emergentContactPhoneNumber String
  //   },
  // });
  return NextResponse.json({ msg: "ok" }, { status: 200 });
};
