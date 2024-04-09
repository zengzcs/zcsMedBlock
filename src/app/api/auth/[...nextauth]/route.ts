import NextAuth from "next-auth";
import { config } from "@/app/lib/auth";

const handler = NextAuth(config);

export { handler as GET, handler as POST };
