import { UserController } from "./controller/UserController"
import {AuthController} from "./controller/AuthController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middleware: AuthController.auth
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    middleware: null
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
    middleware: null
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    middleware: null
},{
    method: "post",
    route: "/users/login",
    controller: AuthController,
    action: "login",
    middleware: null
},{
    method: "post",
    route: "/users/logout",
    controller: AuthController,
    action: "logout",

}]
