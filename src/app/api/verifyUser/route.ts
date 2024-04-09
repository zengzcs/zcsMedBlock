import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cryptoService from "../../lib/crypto";
// export const GET = () => {
//   return NextResponse.json({ msg: "OK" }, { status: 200 });
// };
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
    const a = await prisma.users.findUnique({
      where: {
        userId: Number(json.userid),
      },
    });
    if (a == null) {
      return NextResponse.json({ msg: "User not found" }, { status: 400 });
    } else {
      const result = await cryptoService.passwordMatches(
        json.password,
        a.password
      );
      if (result) {
        return NextResponse.json(a, { status: 200 });
      }
      return NextResponse.json(
        { msg: "Password Not Matches" ,data:a},
        { status: 200 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "error" }, { status: 400 });
  }
};
