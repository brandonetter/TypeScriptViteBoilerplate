import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Program } from "./entity/Program"
import { Lesson } from "./entity/Lesson"
import { Exercise } from "./entity/Exercise"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User,Program,Lesson,Exercise],
    migrations: [],
    subscribers: [],
})
