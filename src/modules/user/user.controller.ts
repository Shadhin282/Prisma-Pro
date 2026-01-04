import { Request, RequestHandler, Response } from "express"
import { prisma } from "../../lib/prisma"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

const register = async (req : Request,res: Response)=>{
    const payload = req.body
    const hashpassword = await bcrypt.hash(payload.password, 10);
    //  payload.password = hashpassword;
    const user = await prisma.user.create({
        data: {
            ...payload,password :hashpassword
        }
    })
    res.status(201).json({
        success: true,
        message : "Created"
    })
} 

const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    const result = await prisma.user.findUnique({
        where : {email} ,
    })
    if (!result) {
        return res.send("User not found.");
    }

    const matchPass = await bcrypt.compare(password, result?.password as string)
    if (!matchPass) {
        return res.send("password not match")
    }

    const token = jwt.sign({ id: result.id, role: result.role }, "very secret", { expiresIn: '7d' });

    res.send({message: "logged in successfully", token})
}

export const userController = {
    register,
    login
}