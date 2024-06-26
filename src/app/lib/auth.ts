import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useRouter } from "next/navigation";

export const config: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("credentials:");
        console.log(credentials);
        if (
          credentials == null ||
          credentials.username == null ||
          credentials.password == null
        ) {
          return null;
        }
        //   return await Promise.resolve(JSON.parse(JSON.stringify("{\"userid\":1}")));
        try {
          console.log("starting fetch");
          const resultResponse = await fetch(
            "http://localhost:3000/api/verifyUser",
            {
              method: "POST",
              body: JSON.stringify({
                userid: credentials.username,
                password: credentials.password,
              }),
            }
          );

          const result = await resultResponse;
          console.log("result.body");
          console.log(result.body);
          const reader = result.body.getReader();
          const { done, value } = await reader.read();
          const deciphertext = new TextDecoder().decode(value);
          console.log("deciphertext");
          console.log(deciphertext);
          const json = JSON.parse(deciphertext);
          console.log("json");
          console.log(json);
          if ("name" in json) {
            return Promise.resolve({
              name: json.userId,
              email: json.category,
              image:credentials.password
            });
          } else {
            return null;
          }
        } catch (e) {
          console.log("ERROR in Fetch");
          console.log(e);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return "/";
    // },
    async redirect({ url, baseUrl }) {
      return "/";
    },
  },
};
const handler = NextAuth(config);


