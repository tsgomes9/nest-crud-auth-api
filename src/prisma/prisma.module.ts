import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Module({
    providers: [PrismaService],
    exports:[PrismaService] //serviços que serão disponibilizados a quem importar este módulo
})
export class PrismaModule {

}