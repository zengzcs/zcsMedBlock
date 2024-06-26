import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { checkPrime } from "crypto";
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
    const a = await prisma.medicalInstitutions.create({
      data: {
        name: json.name,
        region: json.region,
        grade: json.grade,
        password: await cryptoService.hashPassword(json.password),
        email: json.email,
        accountAddress: json.accountAddress,
      },
    });
    try {
      const categoryId = await prisma.medicalInstitutions.findUnique({
        where: {
          name: json.name,
        },
      });
      const result = await prisma.users.create({
        data: {
          userCategoryId: Number(categoryId?.medicalInstitutionId),
          name: json.name,
          category: "INSTITUTION",
          password: await cryptoService.hashPassword(json.password),
          accountAddress: json.accountAddress,
        },
      });

      await prisma.medicalInstitutions.update({
        where: {
          name: json.name,
        },
        data: {
          userId: result.userId,
        },
      });

      console.log({
        userCategoryId: Number(categoryId?.userId),
        name: json.name,
        category: "INSTITUTION",
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
