import { Module } from "../shared/decorators/module.decorator";
import { UserController } from "./http/rest/user.controller";
import { UserDomainService } from "../domain/services/user.domain.service";
import { UserMySqlRepository } from "./adapters/mysql/user.mysql.repository.";
import { UserRepository } from "../domain/ports/outbound/user.repository";
import { UserService } from "../domain/ports/inbound/user.service";
import { UserUseCase } from "../application/user.usecase";

@Module({
    controllers: [
        UserController
    ],
    providers: [
        UserUseCase,
        { provide: UserRepository, useClass: UserMySqlRepository },
        { provide: UserService, useClass: UserDomainService }
    ]
})
export class ContainerModule {}