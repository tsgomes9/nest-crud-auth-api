import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    
    //ao iniciar, conecta com o banco de dados
    async onModuleInit() {
        await this.$connect()
    }

    //encerra a aplicação quando houver erros
    async enableShutdownHooks(app: INestApplication) { 
        process.on('beforeExit', () => {
          app.close();
        });
    }

}