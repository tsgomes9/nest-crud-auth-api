import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService], //todo serviço é um provider
    exports: [UserService]
})
export class UserModule { }