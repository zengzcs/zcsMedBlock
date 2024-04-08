import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import cryptoService from "../../../lib/crypto";

export const config: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userid: { label: "Userid", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);


        // if (
        //   credentials == null ||
        //   credentials.userid == null ||
        //   credentials.password == null
        // ) {
        //   return null;
        // }
        console.log("HHHH")
        

        return { userid: credentials.userid };
      },
    }),
  ],
  session: { strategy: "jwt" },
};
const handler = NextAuth(config);

export { handler as GET, handler as POST };
