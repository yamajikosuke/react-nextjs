import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.username && credentials.password) {
          return {
            id: credentials.username,
            name: credentials.username,
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
