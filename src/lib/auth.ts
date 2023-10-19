import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "./prisma";

import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
