import { PrismaClient } from "@prisma/client";
export default function TestPrisma() {
  const prisma = new PrismaClient();

  async function main() {
    const patientInfo = await prisma.patientPersonalInfo.findMany()
    console.log(patientInfo)
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
  console.log("testPrisma");
    return (
        <div>
            <h2>ssss</h2>
      </div>
  );
}
