import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'

const prisma = new PrismaClient()
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
            name:'Credentials',
            async authorize(credentials, req){
                const result = await prisma.user.findFirst(
                    {
                        where: {
                            email: credentials.email
                        }
                    }
                )
                if(result === null){ throw new Error("No user found with this email.")}
                const checkPw = await compare(credentials.password, result.password)
                if(!checkPw || result.email !== credentials.email){ throw new Error("Username or password doesn't match.")}
                return result
            }
        })
    ],
    secret: process.env.SECRET
})