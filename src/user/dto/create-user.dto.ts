import { IsEmail, Matches } from "class-validator";

export class CreateUserDTO {
    
    @Matches(/^[a-zA-Z]+$/, { message: "Nome só pode conter letras" })
    name: string;

    @IsEmail({}, { message: "Formato de e-mail inválido" })
    email: string;

    @Matches(/^.{3,6}$/, {message: "Mínimo 3 e Máximo 6 caracteres"})
    @Matches(/\d/, {message: "Pelo menos um número"})
    password:string;
}

