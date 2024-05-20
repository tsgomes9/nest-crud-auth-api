import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ParamId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().params.idusers //retorna o id que está no parametro do request
})