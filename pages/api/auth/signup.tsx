import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

type Data = {

  }
  
  export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    //check http method
    if(req.method === 'POST'){
        if(!req.body)return res.status(404).json({message:'Missing form data!'})
        //grab user data from the body
        const {username, email, password} = req.body
        //check if user already exists
        const checkExists = !!await prisma.user.findFirst(
            {
                where: {
                    email: email
                }
            }
        )
        console.log(checkExists)
        if(checkExists) return res.status(422).json({message: 'User already exists, try a different email.'})
        //create user with hashed password

        const result = await prisma.user.create({
            data:{
                name:username,
                email: email,
                password: await hash(password,12)
            }
        })
        console.log(result)
        res.status(201).json({user: result})
    } else{
        res.status(500).json({message: "HTTP method not valid, only POST requests accepted."})
    }
  }