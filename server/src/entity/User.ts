import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"
import { AppDataSource } from "../data-source"
import { IsEmail,Max,MaxLength,Min,MinLength,validate } from "class-validator"
import * as bcrypt from "bcrypt"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @MinLength(2)
    @MaxLength(25)
    firstName: string

    @Column()
    @MinLength(2)
    @MaxLength(25)
    lastName: string

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column()
    password: string

    //optional
    @Column({ nullable: true})
    age: number

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10)
        // this.password = hash;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async checkValid(): Promise<void> {
        let errors_ = await validate(this)
        let errors = []
        if (errors_.length > 0) {
            errors_.forEach((error) => {
                let value = Object.values(error.constraints);
                errors.push(value[0])
            })
        }

        let user = await AppDataSource.getRepository(User).findOne({
            where: { email: this.email }
        })
        if (user) {
            errors.push("email already exists")
        }
        if (errors.length > 0) {
            throw errors
        }


    }

}
