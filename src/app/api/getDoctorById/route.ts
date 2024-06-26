import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cryptoService from "../../lib/crypto";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
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
  console.log(Number(json.doctorId));
  try {
    const a = await prisma.doctor.findUnique({
      where: {
        userId: Number(json.doctorId),
      },
    });
    console.log("find doctor")
    console.log(a);
    if (a == null) {
      
      return NextResponse.json({ msg: "User not found" ,data:a}, { status: 400 });
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
    return NextResponse.json({ msg: "error" ,err:e}, { status: 200 });
  }
};
