import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.patient.create({
    data: {
      name: "111",
      icNumber: "111",
      phoneNumber: "111",
      occupation: "111",
      email: "111",
      gender: "111",
      height: 175,
      weight: 111,
      bloodGroup: "111",
      address: "111",
      currentMedication: "111",
      allergy: "111",
      emergentContactName: "111",
      emergentContactPhoneNumber: "111",
    },
  });
  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
