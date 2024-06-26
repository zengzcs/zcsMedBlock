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
        accountAddress: json.accountAddress,
      },
    });
    console.log("storeToPatients");
    console.log(a);
    console.log(await cryptoService.passwordMatches(json.password, a.password));
    const stringText = JSON.stringify(json);
    console.log("stringText:" + stringText);

    try {
      const categoryId = await prisma.patients.findUnique({
        where: {
          icNumber: json.icNumber,
        },
      });
      const result = await prisma.users.create({
        data: {
          userCategoryId: Number(categoryId?.patientId),
          name: json.name,
          category: "PATIENT",
          password: await cryptoService.hashPassword(json.password),
          accountAddress: json.accountAddress,
        },
      });

      await prisma.patients.update({
        where: {
          icNumber: json.icNumber,
        },
        data: {
          userId: result.userId,
        },
      });
      console.log({
        userCategoryId: Number(categoryId?.userId),
        name: json.name,
        category: "PATIENT",
        password: await cryptoService.hashPassword(json.password),
        accountAddress: json.accountAddress,
      });
    } catch (e) {
      console.log("Error when store to users");
      console.log(e);
    }
    return NextResponse.json({ msg: "ok" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
};
