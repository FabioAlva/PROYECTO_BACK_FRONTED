
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SECRET_JWT } from 'constants/jwt-key';
import { PayloadEntity } from '../entity/payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET_JWT,
    });
  }

  async validate(payload: PayloadEntity) {
    return { userId: payload.sub, username: payload.username };
  }
}
