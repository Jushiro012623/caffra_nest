import { Module } from '@nestjs/common';
import { JwtService } from '@app/auth/jwt/jwt.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule as JWTModule } from '@nestjs/jwt';

@Module({
  imports: [
    JWTModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: '30m',
        },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
