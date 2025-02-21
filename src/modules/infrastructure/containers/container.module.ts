import { UserUseCase } from "@application/user.usecase";
import { PasswordHashService } from "@domain/ports/inbound/password-hash.service";
import { UserRepository } from "@domain/ports/outbound/user.repository";
import { ChangeStatusUserDomainService } from "@domain/services/change-status-user.domain.service";
import { CreateUserDomainService } from "@domain/services/create-user.domain.service";
import { UpdateUserDomainService } from "@domain/services/update-user.domain.service";
import { UserMySqlRepository } from "@infrastructure/adapters/mysql/user.mysql.repository.";
import { PasswordHashServiceImpl } from "@infrastructure/adapters/services/password-hash.impl.service";
import { UserController } from "@infrastructure/http/rest/user.controller";
import { Module } from "src/modules/shared/decorators/module.decorator";

@Module({
    controllers: [
        UserController
    ],
    providers: [
        { useClass: ChangeStatusUserDomainService, injectables: [UserRepository]},
        { useClass: CreateUserDomainService, injectables: [UserRepository, PasswordHashService]},
        { useClass: UpdateUserDomainService, injectables: [UserRepository, PasswordHashService]},
        { useClass: UserUseCase, injectables: [UserRepository, CreateUserDomainService, UpdateUserDomainService, ChangeStatusUserDomainService] },
        { provide: UserRepository, useClass: UserMySqlRepository },
        { provide: PasswordHashService, useClass: PasswordHashServiceImpl },     
    ]
})
export class ContainerModule {}
