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
    const a = await prisma.admins.create({
      data: {
        name: json.name,
        password: await cryptoService.hashPassword(json.password),
        
      },
    });
    try {
      const categoryId = await prisma.admins.findUnique({
        where: {
          adminId:json.adminId,
        },
      });
      const result = await prisma.users.create({
        data: {
          userCategoryId: Number(categoryId?.adminId),
          name: json.name,
          category: "ADMIN",
          password: await cryptoService.hashPassword(json.password),
          accountAddress: json.accountAddress,
        },
      });
      console.log({
        userCategoryId: Number(categoryId?.userId),
        name: json.name,
        category: "ADMIN",
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
