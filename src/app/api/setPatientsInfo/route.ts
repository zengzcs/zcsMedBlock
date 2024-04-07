import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cryptoService from "../../lib/crypto";
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
    const a = await prisma.patients.create({
      data: {
        phoneNumber: json.phoneNumber,
        name: json.name,
        icNumber: json.icNumber,
        email: json.email,
        gender: json.gender,
        height: Number.parseFloat(json.height),
        weight: Number.parseFloat(json.weight),
        occupation: json.occupation,
        address: json.address,
        bloodGroup: json.bloodGroup,
        allergiesHistory: json.allergies,
        diagnosisHistory: json.medications,
        emergentContactName: json.emergentContactName,
        emergentContactPhoneNumber: json.emergentContactPhoneNumber,
        password: await cryptoService.hashPassword(json.password),
      },
    });
    console.log(await cryptoService.passwordMatches(json.password, a.password))
    const stringText = JSON.stringify(json)
    

    return NextResponse.json({ msg: "ok" }, { status: 200 });
  }
  catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
  
};
