import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {UserModule} from "@app/user/user.module";
import {AuthModule} from "@app/user/auth/auth.module";
import {appConfig, jwtConfig, typeormConfig} from "@app/config";
import {IsConfirmedValidator, IsUniqueConstraintValidator} from "@app/common";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, typeormConfig, jwtConfig],
        }),
        TypeOrmModule.forRoot(typeormConfig()),
        UserModule, AuthModule
    ],
    controllers: [],
    providers: [IsUniqueConstraintValidator, IsConfirmedValidator],
})
export class AppModule {
}
