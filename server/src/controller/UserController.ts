import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import type { User as UserType, Err } from "./Types"
import { conformToUser } from "./ConformUtils"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv";

dotenv.config();
export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) : Promise<UserType[]> {
        let users = await this.userRepository.find();
        let userList: UserType[] = users.map((user: UserType) => conformToUser(user));
        return userList
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
    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName,email,password } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,

            email,
            password
        })

        try{
            let result = await this.userRepository.save(user)
            return result
        }catch(err){
            return {error:err}
        }





    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}
