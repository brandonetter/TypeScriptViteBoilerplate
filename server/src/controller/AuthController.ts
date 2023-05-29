
import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import type { User as UserType, Err } from "./Types"
import { conformToUser } from "./ConformUtils"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv";

export class AuthController{

    private userRepository = AppDataSource.getRepository(User)

    public static auth = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
        //get token from cookie
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Auth Error" })
        }
        //verify token
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            req.body.email = decoded.user
            let user = await AppDataSource.getRepository(User).findOne({
                where: { email: decoded.user }
            });
            if (!user) {
                return res.status(401).json({ message: "Auth Error" })
            }
            req.body.user = conformToUser(user)
        } catch (e) {
            console.error(e)
            res.status(500).send({ message: "Invalid Token" })
        }

        next()
    }
    async login(request: Request, response:Response, next:NextFunction): Promise<any> {
        let { email, password } = request.body;
        let user = await this.userRepository.findOne({
            where: { email }
        })
        if (!user) {
            return {Error:"unregistered user"}
        }
        let isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return {Error:"wrong password"}
        }
        let token = jwt.sign({user:user.email},process.env.SECRET)
        response.cookie("token", token, { httpOnly: true })
        return conformToUser(user)

    }
    async logout(request: Request, response: Response, next: NextFunction): Promise<any> {
        response.clearCookie("token")
        return {success:'logged out'}
    }
}
