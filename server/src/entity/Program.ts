import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate,ManyToMany,ManyToOne} from "typeorm"
import { AppDataSource } from "../data-source"
import {User} from "./User"
import {Lesson} from "./Lesson"
// typeORM repository for User Programs.
// should have name of program, description, and an association with the exercises in the program
@Entity()
export class Program {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    exercises: string

    @ManyToMany(() => User, user => user.programs)
    users: User[]

    @ManyToOne(()=>Lesson, lesson => lesson.program)
    lessons: Lesson[]

}
