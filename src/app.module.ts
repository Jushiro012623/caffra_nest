import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { appConfig, jwtConfig, typeormConfig } from '@app/config';
import { AuthModule } from '@app/auth/auth.module';
import { UserModule } from './user/user.module';
import { CryptoModule } from './crypto/crypto.module';
import {
  IsConfirmedValidator,
  IsExistsValidator,
  IsUniqueConstraintValidator,
} from '@app/common/validators';

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
  ],
  controllers: [],
  providers: [
    IsUniqueConstraintValidator,
    IsConfirmedValidator,
    IsExistsValidator,
  ],
})
export class AppModule {}
