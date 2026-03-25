import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from '@app/user/user.module';
import {AuthController} from './auth.controller';
import {CryptoModule} from '@app/crypto/crypto.module';
import {JwtModule} from '@app/auth/jwt/jwt.module';
import {LoggerModule} from "@app/common/logger/logger.module";

@Module({
    imports: [UserModule, CryptoModule, JwtModule, LoggerModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}
