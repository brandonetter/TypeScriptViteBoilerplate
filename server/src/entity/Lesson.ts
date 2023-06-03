import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate,OneToMany,ManyToOne} from "typeorm"
import { AppDataSource } from "../data-source"
import {Program} from "./Program"
import {Exercise} from "./Exercise"

@Entity()
export class Lesson {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    content: string

    @OneToMany(() => Program, program => program.lessons)
    program: Program

    @ManyToOne(()=>Exercise, exercise => exercise.lesson)
    exercises: Exercise[]

}
