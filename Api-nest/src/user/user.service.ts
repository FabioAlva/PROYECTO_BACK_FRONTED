import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { identity, NotFoundError } from 'rxjs';
import { stringify } from 'node:querystring';
@Injectable()
export class UsersService {

  constructor (private prisma:PrismaService) { }



 async createUser(body:CreateUserDto){
  console.log(JSON.stringify(body,null,2))
 try{
  const salts = await bcrypt.genSalt();
  const hash = await bcrypt.hash(body.password,salts);
   
  const newUser = await this.prisma.user.create({
    data: {
      email: body.email,
      password: hash
    }
  })
  // Probar intercambiando a ver que pasa

  const {password,...rest} = newUser
  return rest
 }catch(error){
  if(error instanceof Error){
  console.log(error);
  throw new InternalServerErrorException("Error creando usuario");   }
  }
 }


  async findOneUser(email:string){
    try {
      const user = 
      await this.prisma.user.findUnique(
        {where: {email}})
     if(user) return user
      return null
    } catch (error) {
   if(error instanceof Error){
    throw new InternalServerErrorException(error.message)
   }}
}



   async getUserId(id : number){
    try{
   const user = await this.prisma.user.findFirst(
    {where: {id}
  })

     if(!user)  throw new NotFoundException(`usuario con ${id} no encontrado`)

    } catch(error){
      if (error instanceof NotFoundError)throw new NotFoundException(error.message)
      if(error instanceof Error) throw new InternalServerErrorException(error.message)
    }
   
   }
   
}