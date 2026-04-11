import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

type AuthUserRecord = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

async function ensureBootstrapAdmin(email: string, password: string) {
  await connectToDatabase();

  const existingUser = (await User.findOne({ email }).lean()) as AuthUserRecord | null;

  if (existingUser) {
    return existingUser;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    name: "Touchpointe Admin",
    email,
    password: hashedPassword,
    role: "admin"
  });

  return createdUser.toObject() as AuthUserRecord;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;
        const bootstrapEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
        const bootstrapPassword = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
          return null;
        }

        try {
          await connectToDatabase();

          let user = (await User.findOne({ email }).lean()) as AuthUserRecord | null;

          if (!user && email === bootstrapEmail && bootstrapPassword) {
            user = await ensureBootstrapAdmin(email, bootstrapPassword);
          }

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          return {
            id: String(user._id),
            name: user.name,
            email: user.email,
            role: user.role
          };
        } catch (error) {
          if (email === bootstrapEmail && password === bootstrapPassword) {
            return {
              id: "bootstrap-admin",
              name: "Touchpointe Admin",
              email,
              role: "admin"
            };
          }

          console.error("Auth authorize failed", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub || "";
        session.user.role = token.role || "admin";
      }

      return session;
    }
  }
};

export async function getAdminSession() {
  return getServerSession(authOptions);
}
