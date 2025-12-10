import { Get, Injectable, InternalServerErrorException, UseGuards, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UsersService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entity/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Injectable()
export class AuthService{
constructor(
private usersService:UsersService,
private jwtService : JwtService
) { }

async validateUser(body:CreateUserDto){
  try{    
    const user =await this.usersService.findOneUser(body.email)
  const matchResul = await bcrypt.compare(body.password,user?.password??'')
   if(user && matchResul){
    const {password,...rest} = user
    return rest
   }
   return null
  } catch(error){
    if(error instanceof Error){
        throw new InternalServerErrorException(error.message)
       }
  }
}

@UseGuards(LocalAuthGuard)
  login(user: UserEntity) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }





}
