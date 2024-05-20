import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ParseIntPipe } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/decorator-id.decorator";

@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    async create(@Body() body: CreateUserDTO ) { 
        return this.userService.create(body)
    }

    @Get()
    async read() {
        return this.userService.list()
    }

    @Get(':id') 
    async readOne(@ParamId() id) {
        return this.userService.getOne(id)
    }

    @Put(':id')
    async update(@Body() body:UpdatePutUserDTO, @ParamId() id){
        return this.userService.update(id, body)
    }

    @Patch(':id')
    async patch(@Body() body: UpdatePatchUserDTO,  @ParamId() id){
        return this.userService.patch(id, body)
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id){
        return this.userService.delete(id)
    }

}