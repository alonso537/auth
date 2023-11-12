import { Request, Response } from "express";


export class AuthController {
    //DI
    constructor() {}

    

    register = (req: Request, res: Response) => {

        res.json('Register User')
    }

    login = (req: Request, res: Response) => {

        res.json('Login User')
    }

    validateEmail = (req: Request, res: Response) => {

        res.json('Validate Email User')
    }

}