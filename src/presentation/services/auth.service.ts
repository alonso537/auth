import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { envs } from "../../config/envs";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";




export class AuthService {
    //DI
    constructor(
        private readonly emailService : EmailService
    ) {}

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email })

        if (existUser) {
            throw CustomError.badRequest('Email already exists')
        }

        try {
            const user = new UserModel(registerUserDto)
            
            //Encrypt password
            user.password = bcryptAdapter.hash(registerUserDto.password)
            
            await user.save()
            //Generate token JWT

            //Send email to validate email
            await this.sendEmailValidationLink(user.email);

            const {password, ...rest} = UserEntity.fromObject(user)

            return {user: rest, token: 'ABC'}
        } catch (error: any) {
            throw CustomError.internal(`Error creating user: ${error}`)
        }

    }
    public async loginUser(loginUserDto: LoginUserDto) {
        //findone para verificiar si existe el usuario
        const user = await UserModel.findOne({ email: loginUserDto.email })

        if (!user) {
            throw CustomError.notFound('Credentials not found')
        }

        //comparar password
        const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password)

        if (!isMatch) {
            throw CustomError.badRequest('Credentials not found')
        }

        //generar token
        const token = await JwtAdapter.generateToken({id: user._id}, '2h')

        if(!token) {
            throw CustomError.internal('Error generating token')
        }

        //retornar usuario y token
        const {password, ...rest} = UserEntity.fromObject(user)

        return {user: rest, token: token}
    }

    private sendEmailValidationLink = async (email: string) => {
        const token = await JwtAdapter.generateToken({email}, '1h')
        if(!token) {
            throw CustomError.internal('Error generating token')
        }
        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
        const htmlBody = `
            <h1>Validate your email</h1>
            <p>Click <a href="${link}">here</a> to validate your email: ${email}</p>
        
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody
        }

        const isSent = await this.emailService.sendEmail(options)
        if(!isSent) {
            throw CustomError.internal('Error sending email')
        }

        return true
    }

    public validateEmail = async (token: string) => {
        const decoded = await JwtAdapter.verifyToken(token)
        if(!decoded) {
            throw CustomError.unauthorized('Invalid token')
        }

        const {email} = decoded as {email: string}
        if(!email) {
            throw CustomError.internal('Error validating email')
        }
        const user = await UserModel.findOne({email})
        if(!user) {
            throw CustomError.internal('User not found')
        }

        user.emailValidated = true
        await user.save()

        return true

    }
}