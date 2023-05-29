import * as express from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(cookieParser())


    // register express routes from defined application routes
    Routes.forEach(route => {
        if(route.middleware){
            app[route.method](route.route,route.middleware, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next)
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

                } else if (result !== null && result !== undefined) {
                    res.json(result)
                }
            })
        }
        else
        app[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(7777)

    // insert new users for test
    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Timber",
    //         lastName: "Saw",
    //         email: "asd@email.com",
    //         password: "asdasd"

    //     })
    // )

    // await AppDataSource.manager.save(
    //     AppDataSource.manager.create(User, {
    //         firstName: "Phantom",
    //         lastName: "Assassin",
    //         age: 24,
    //         email: "asdasdasd@email.com",
    //         password:"asdad"
    //     })
    // )

    console.log("Express server has started on port 7777. Open http://localhost:7777/users to see results")

}).catch(error => console.log(error))
