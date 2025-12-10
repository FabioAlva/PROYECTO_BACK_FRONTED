import { Controller, Post, UseGuards ,Request, Body, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UsersService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-aut.guard';

@Controller('auth')
export class AuthController {

    constructor(private authServices:AuthService, private userService:UsersService){
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    Login(@Request() req){
        return this.authServices.login(req.user)
    }    

    @Post('/register')
    async register(@Body() body:CreateUserDto){
        return this.userService.createUser(body)
    }
  
    
@UseGuards(JwtAuthGuard)
@Get('/profile')
async getProfile(@Request() req) {
  return  await this.userService.getUserId(req.userId)
}
    
    
}
