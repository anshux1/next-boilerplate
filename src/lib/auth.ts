import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/db"
import { compare, hash } from "bcryptjs";
import { SignUpSchema, SignInSchema } from "@/types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "signin",
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", placeholder: "Username", type: "text" },
        password: { label: "Password", placeholder: "Password", type: "password" },
      },
      async authorize(credentials: | Record<"username" | "password", string> | undefined) :Promise<User | null> {
        if(!credentials){
          throw new Error("Credentials missing")
        }
        console.log("Credentials :", credentials)
        const { success, error } = SignInSchema.safeParse(credentials)
        if(!success){
          throw new Error(error.errors[0]?.message)
        }
        const isUserExist = await db.user.findFirst({
          where: {
            username: credentials.username
          }
        })
        if(!isUserExist){
          throw new Error("User not found")
        }
        if(isUserExist && (!await compare(credentials.password, isUserExist.password))){
          throw new Error("Incorrect password!")
        }
        return {
          id: isUserExist.id,
          name: isUserExist.name,
          username: isUserExist.username
        }
      },
    }),   
    CredentialsProvider({
      id: "signup",
      name: "signup",
      type: "credentials",
      credentials: {
        name: { label: "Username", placeholder: "Username", type: "text" },
        username: { label: "Username", placeholder: "Username", type: "text" },
        password: { label: "Password", placeholder: "Password", type: "password" },
      },
      async authorize(credentials: Record<"name" | "username" | "password", string> | undefined) :Promise<User | null> {
        console.log("inside signup :",credentials)
        if(!credentials){
          throw new Error("Credentials missing")
        }
        const { success, error } = SignUpSchema.safeParse(credentials)
        if(!success){
          throw new Error(error.errors[0]?.message)
        }
        const isUserExist = await db.user.findFirst({
          where: {
            username: credentials.username
          }
        })
        if(isUserExist){
          throw new Error("User with username already exist")
        }
        const hashedPassword = await hash(credentials.password, 10)
        const newUser = await db.user.create({
          data: {
            name: credentials.name,
            username: credentials.username,
            password: hashedPassword,
          }
        })
        return {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username
        }
      },
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if(user){
        token.id = user.id;
        token.username = user.username;
        token.name = user.name;
      }
      return token
    },
    session({ session, token }){
      if(token){
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
      } 
      return session
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/signin",
    newUser: "/signup"
  },
  secret: process.env.NEXTAUTH_SECRET
}
