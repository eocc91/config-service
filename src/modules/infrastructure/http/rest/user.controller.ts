
import { Controller } from "../../../shared/decorators/controller.decorator";
import { Post } from "../../../shared/decorators/post.decorator";
import { Get } from "../../../shared/decorators/get.decorator";
import { RequestParams } from "../../../shared/decorators/request-params.decorator";
import { Body } from "../../../shared/decorators/body.decorator";
import { Put } from "../../../shared/decorators/put.decorator";
import { QueryParams } from "../../../shared/decorators/query-params.decorator";
import { UserUseCase } from "@application/user.usecase";
import { User } from "@domain/models/user";
import { ResponseBody } from "src/modules/shared/response/response-body";
import { UserException } from "@domain/exceptions/user.exception";


@Controller('/users')
export class UserController {
    constructor(
        private userUseCase: UserUseCase
    ){}

    @Get('/')
    async getAll( @QueryParams() params: any ): Promise<ResponseBody> {
        try {
            const users = await this.userUseCase.getAll(params);
            return {
                status: 200,
                data: users
            }
        } catch (error: any) {
            return {
                status: 500,
                message: "Error al consultar los usuarios",
                error: error
            }
        }
    }

    @Get('/:idUser')
    async saveUser( @RequestParams('idUser') idUser: string ): Promise<ResponseBody> {
        try{
            const user = this.userUseCase.getById(idUser);
            return {
                status: 200,
                data: user
            }
        } catch( error ) {
            return {
                status: 500,
                message: "Error al consultar el usuario",
                error: error
            }
        }

    }

    @Post('/')
    async create( @Body() user: User ): Promise<ResponseBody> {
        try {
            let newUser = await this.userUseCase.create(user);
            return {
                status: 200,
                message: 'El usuario se guardo correctamente',
                data: newUser

            }
        } catch (error: any) {
            if( error instanceof UserException) {
                return {
                    status: 400,
                    message: error.message
                }
            } else {
                return {
                    status: 500,
                    message: "Error al guardar el usuario",
                    error: error
                }
            }
        }

    }

    @Put('/:idUser')
    async update( @Body() user: User, @RequestParams('idUser') idUser: number ): Promise<ResponseBody> {
        try {
            let newUser = await this.userUseCase.update(idUser, user);
            return {
                status: 200,
                message: 'El usuario se guardo correctamente',
                data: newUser

            }
        } catch (error: any) {
            console.log(error)
            if( error instanceof UserException) {
                return {
                    status: 400,
                    message: error.message
                }
            } else {
                return {
                    status: 500,
                    message: "Error al guardar el usuario",
                    error: error.message
                }
            }
        }

    }

    @Put('/enable/:idUser')
    async enable( @RequestParams('idUser') idUser: number ): Promise<ResponseBody> {
        try {
            let newUser = await this.userUseCase.enable(idUser);
            return {
                status: 200,
                message: 'El usuario se habilitó correctamente',
                data: newUser

            }
        } catch (error: any) {
            if( error instanceof UserException) {
                return {
                    status: 400,
                    message: error.message
                }
            } else {
                return {
                    status: 500,
                    message: "Error al habilitar el usuario",
                    error: error
                }
            }
        }

    }

    @Put('/disable/:idUser')
    async disable( @RequestParams('idUser') idUser: number ): Promise<ResponseBody> {
        try {
            let newUser = await this.userUseCase.disable(idUser);
            return {
                status: 200,
                message: 'El usuario se deshabilitó correctamente',
                data: newUser

            }
        } catch (error: any) {
            if( error instanceof UserException) {
                return {
                    status: 400,
                    message: error.message
                }
            } else {
                return {
                    status: 500,
                    message: "Error al deshabilitar el usuario",
                    error: error
                }
            }
        }

    }

    @Put('/delete/:idUser')
    async delete( @RequestParams('idUser') idUser: number ): Promise<ResponseBody> {
        try {
            let newUser = await this.userUseCase.delete(idUser);
            return {
                status: 200,
                message: 'El usuario se eliminó correctamente',
                data: newUser

            }
        } catch (error: any) {
            if( error instanceof UserException) {
                return {
                    status: 400,
                    message: error.message
                }
            } else {
                return {
                    status: 500,
                    message: "Error al eliminar el usuario",
                    error: error
                }
            }
        }

    }
}