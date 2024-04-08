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
    const a = await prisma.doctor.create({
      data: {
        phoneNumber: json.phoneNumber,
        name: json.name,
        icNumber: json.icNumber,
        email: json.email,
        gender: json.gender,
        category: json.category,
        medicalInstitutionId: Number.parseInt(json.medicalInstitutionId),
        password: await cryptoService.hashPassword(json.password),
        accountAddress: json.accountAddress,
      },
    });
    try {
      const categoryId = await prisma.doctor.findUnique({
        where: {
          icNumber: json.icNumber,
        },
      });
      const result = await prisma.users.create({
        data: {
          userCategoryId: Number(categoryId?.doctorId),
          name: json.name,
          category: "DOCTOR",
          password: await cryptoService.hashPassword(json.password),
          accountAddress: json.accountAddress,
        },
      });
      console.log({
        userCategoryId: Number(categoryId?.userId),
        name: json.name,
        category: "DOCTOR",
        password: await cryptoService.hashPassword(json.password),
        accountAddress: json.accountAddress,
      });
    } catch (e) {
      console.log("Error when store to users");
      console.log(e);
    }
    const stringText = JSON.stringify(json);

    return NextResponse.json({ msg: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
};
