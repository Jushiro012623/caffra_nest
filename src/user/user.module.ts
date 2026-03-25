import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '@app/user/entities/user.entity';
import {CryptoModule} from '@app/crypto/crypto.module';
import {UserController} from './user.controller';
import {LoggerModule} from "@app/common/logger/logger.module";
import {JwtModule} from "@app/auth/jwt/jwt.module";

@Module({
    imports: [CryptoModule, TypeOrmModule.forFeature([User]), LoggerModule, JwtModule],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController],
})
export class UserModule {
}
