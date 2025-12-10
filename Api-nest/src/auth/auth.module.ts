import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_JWT } from 'constants/jwt-key';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [PassportModule , UsersModule,
     JwtModule.register({
      secret: SECRET_JWT,
      signOptions: { expiresIn: '3hrs' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
