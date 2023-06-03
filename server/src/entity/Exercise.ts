import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate,OneToMany} from "typeorm"
import {Lesson} from "./Lesson"
@Entity()
export class Exercise {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    question: string

    @OneToMany(() => Lesson, lesson => lesson.exercises)
    lesson: Lesson

}
