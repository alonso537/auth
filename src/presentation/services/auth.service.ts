import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";




export class AuthService {
    //DI
    constructor() {}

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
            throw CustomError.notFound('Email not found')
        }

        //comparar password
        const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password)

        if (!isMatch) {
            throw CustomError.unauthorized('Invalid password')
        }

        //generar token

        //retornar usuario y token
        const {password, ...rest} = UserEntity.fromObject(user)

        return {user: rest, token: 'ABC'}
    }

    public validateEmail() {

    }
}