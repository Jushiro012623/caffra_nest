import {Module} from "@nestjs/common";
import {UserModule} from "@app/user/user.module";
import {AuthService} from "@app/user/auth/auth.service";
import {AuthController} from "@app/user/auth/auth.controller";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            global: true,
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('jwt.secret'),
                signOptions: {
                    expiresIn: '60s',
                }
            })
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],
})

export class AuthModule {
}