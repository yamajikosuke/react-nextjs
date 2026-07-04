import { timingSafeEqual } from "node:crypto";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function isValidPassword(input: string, expected: string) {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(inputBuffer, expectedBuffer);
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const expectedUsername = process.env.AUTH_DEMO_USERNAME;
        const expectedPassword = process.env.AUTH_DEMO_PASSWORD;

        if (!credentials?.username || !credentials.password) {
          return null;
        }

        if (!expectedUsername || !expectedPassword) {
          return null;
        }

        const isValidUser = credentials.username === expectedUsername;
        const isValidPass = isValidPassword(credentials.password, expectedPassword);

        if (!isValidUser || !isValidPass) {
          return null;
        }

        return {
          id: credentials.username,
          name: credentials.username,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};
