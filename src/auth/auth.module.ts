import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from "@app/user/user.module";
import {AuthController} from './auth.controller';
import {CryptoModule} from "@app/crypto/crypto.module";
import {JwtService} from "@app/auth/jwt/jwt.service";
import {JwtModule} from "@app/auth/jwt/jwt.module";

@Module({
    imports: [
        UserModule,
        CryptoModule,
        JwtModule
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {
}
