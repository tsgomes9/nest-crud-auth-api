import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";

@Module({
    imports: [JwtModule.register({
        secret: `123`
    }),
        UserModule,
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService] //todo serviço é um provider
})
export class AuthModule {

}