import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "@app/user/user.module";
import {AuthModule} from "@app/user/auth/auth.module";
import {appConfig, jwtConfig, typeormConfig} from "@app/config";
import {IsConfirmedValidator, IsUniqueConstraintValidator, IsExistsValidator} from "@app/common";
import {RolesModule} from "@app/user/roles/roles.module";
import {AuthGuard} from "@app/user/auth/auth.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, typeormConfig, jwtConfig],
        }),
        TypeOrmModule.forRoot(typeormConfig()),
        UserModule, AuthModule, RolesModule
    ],
    controllers: [],
    providers: [
        IsUniqueConstraintValidator,
        IsConfirmedValidator,
        IsExistsValidator,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },],
})
export class AppModule {
}
