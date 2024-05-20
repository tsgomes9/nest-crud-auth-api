import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { users } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";


@Injectable()
export class AuthService {
    constructor(private readonly JWTService: JwtService, private readonly prisma: PrismaService, private readonly userService: UserService) { }

    async createToken(user: users) {
        return {
            accessToken: this.JWTService.sign({
                sub: user.idusers,
                name: user.name,
                email: user.email
            }, {
                expiresIn: "1 hour",
                issuer: "login",
                audience: "users"
            })
        }
    }

    async checkToken(token: string) {

        try {
            const data = this.JWTService.verify(token, {
                audience: 'users',
                issuer: 'login',
            })
            return data
        } catch (e) {
            throw new BadRequestException(e.message);
        }

    }

    async login(email: string, password: string) {

        const user = await this.prisma.users.findFirst({
            where: {
                email,
                password
            }
        });

        if (!user) {
            throw new UnauthorizedException('E-mail ou senha incorretos')
        }

        return this.createToken(user)
    }

    async forget(email: string) {
        const user = await this.prisma.users.findFirst({
            where: {
                email
            }
        });

        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto')
        }

        //TO DO: Enviar e-mail...

        return true
    }

    async reset(password: string, token: string) {
        //TO DO: Validar o token...

        const id = 0

        const user = await this.prisma.users.update({
            where: {
                idusers: id
            },
            data: {
                password,
            }
        })

        return this.createToken(user)
    }

    async register(data: AuthRegisterDTO) {

        const user = await this.userService.create(data)

        return this.createToken(user)
    }
}


