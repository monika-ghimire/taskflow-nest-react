import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';



@Controller('auth')
export class AuthController {
 

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  login(@Req() req) {
    //jwt token
 
    return req.user;
  }

  
}
