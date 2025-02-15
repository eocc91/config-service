
import { User } from "../../../domain/models/user";
import { UserRepository } from "../../../domain/ports/outbound/user.repository";
import { Request, Response } from "express";
import { Controller } from "../../../shared/decorators/controller.decorator";
import { Post } from "../../../shared/decorators/post.decorator";
import { Get } from "../../../shared/decorators/get.decorator";
import { UserDomainService } from "../../../domain/services/user.domain.service";
import { RequestParams } from "../../../shared/decorators/request-params.decorator";
import { Body } from "../../../shared/decorators/body.decorator";
import { Put } from "../../../shared/decorators/put.decorator";
import { Delete } from "../../../shared/decorators/delete.decorator";
import { QueryParams } from "../../../shared/decorators/query-params.decorator";
import { UserUseCase } from "@application/user.usecase";


@Controller('/users')
export class UserController {
    constructor(
        private userUseCase: UserUseCase,
    ){}

    @Get('/')
    async getAll( @QueryParams() params: any ): Promise<any> {
        try {
            // console.log(this.userUseCase);
            const users = await this.userUseCase.getAll(params);
            return {
                status: 200,
                message: users
            }
        } catch (error: any) {
            return {
                status: 500,
                message: error.message
            }
        }
    }

    @Put('/:id')
    async saveUser(@Body() user: any, @RequestParams('id') id: string ): Promise<any> {
        console.log( user, id);
        this.userUseCase.getAll({})

        return {
            status: 200,
            message: user
        }
    }

    @Delete('/:id')
    async getById( @RequestParams('id') id: string, @QueryParams() idUser: string ): Promise<any> {
        try {
            
            console.log( id, idUser );
    
            // this.userUseCase.getAll({})
            return {
                status: 200,
                message: 'User found'
            }
        } catch (error) {     
            // console.log(error)
            return {
                status: 500,
                message: error
            }       
        }

    }
}