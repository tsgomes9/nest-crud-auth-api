import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private prisma: PrismaService) {}

    async userExists(idusers:number) {
        if(!(await this.prisma.users.count({
            where: {
                idusers
            }
        }))){ 
            throw new NotFoundException(`O usuário ${idusers} não existe.`)
        }
    }

    async create(data:CreateUserDTO){ 
        
        return await this.prisma.users.create({
            data
        })
    }

    async list() {
        return await this.prisma.users.findMany()
    }

    async getOne(idusers:number) {
        return await this.prisma.users.findUnique({
            where: {
                idusers
            }
        })
    }

    async update(idusers: number, data: UpdatePutUserDTO) {

        await this.userExists(idusers)

        return await this.prisma.users.update({
            data,
            where:{idusers}
        })
    }

    async patch(idusers: number, data: UpdatePatchUserDTO) {

        await this.userExists(idusers)

        return await this.prisma.users.update({
            data,
            where:{idusers}
        })
    }

    async delete(idusers:number) {

        await this.userExists(idusers)

        return await this.prisma.users.delete({
            where:{idusers}
        })
    }
}