import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";


export class AuthController {
    //DI
    constructor(
        public readonly authService: AuthService
    ) {}

    

    register = (req: Request, res: Response) => {

        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if (error) {
            return res.status(400).json({ error })
        }

        this.authService.registerUser(registerUserDto!)
            .then(user => {
                res.json(user)
            })
            .catch(error => {
                res.status(error.status).json({ error: error.message })
            })

        // res.json(registerUserDto)
    }

    login = (req: Request, res: Response) => {

        res.json('Login User')
    }

    validateEmail = (req: Request, res: Response) => {

        res.json('Validate Email User')
    }

}