import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import type { User as UserType, Err } from "./Types"
import { conformToUser } from "./ConformUtils"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv";
import { Json } from "sequelize/types/utils"

dotenv.config();
export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) : Promise<UserType[]> {
        let users = await this.userRepository.find();
        let userList: UserType[] = users.map((user: UserType) => conformToUser(user));
        return userList
    }


    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return conformToUser(user);
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<UserType | Err> {
        const { firstName, lastName,email,password,status } = request.body;

        if(status !== "instructor" && status !== "student"){
            return {message:"status must be instructor or student"}
        }

        const user = Object.assign(new User(), {
            firstName,
            lastName,

            email,
            password,
            status
        })

        try{
            let result = await this.userRepository.save(user)
            return conformToUser(result);
        }catch(err){
            return {message:err}
        }





    }
    async updateAge(request: Request, response: Response, next: NextFunction): Promise<UserType | Err>{
        const { age } = request.body;
        const id = request.body.user.id;
        let user = await this.userRepository.findOneBy({id});

        user.age = user.age+1;
        console.log(user);
        try{
        let result = await this.userRepository.save({
            ...user
        });
        return result;
        }catch(err){
            return {message:err}
        }

        // return result;


    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<string> {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

}
