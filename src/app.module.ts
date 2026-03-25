import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {appConfig, jwtConfig, typeormConfig} from '@app/config';
import {AuthModule} from '@app/auth/auth.module';
import {
    IsConfirmedValidator,
    IsExistsValidator,
    IsUniqueConstraintValidator,
} from '@app/common/validators';
import {UserModule} from "@app/user/user.module";
import {CryptoModule} from "@app/crypto/crypto.module";
import { LoggerService } from './common/logger/logger.service';
import { LoggerModule } from './common/logger/logger.module';
import {AuthGuard} from "@app/auth/guard/auth.guard";
import {APP_GUARD} from "@nestjs/core";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [appConfig, typeormConfig, jwtConfig],
        }),
        TypeOrmModule.forRoot(typeormConfig()),
        AuthModule,
        UserModule,
        CryptoModule,
        LoggerModule,
    ],
    controllers: [],
    providers: [
        IsUniqueConstraintValidator,
        IsConfirmedValidator,
        IsExistsValidator,
        LoggerService,
    ],
})
export class AppModule {
}
