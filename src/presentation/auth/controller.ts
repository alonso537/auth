import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";


export class AuthController {
    //DI
    constructor(
        public readonly authService: AuthService
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }

        console.log(`${error}`);
        
        return res.status(500).json({ error: 'Internal server error' })
    }
    

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
                this.handleError(error, res)
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