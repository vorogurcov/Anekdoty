import {Get, Post, Controller, Render, Body, Res} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LoginUserDto} from "../dto/LoginUserDto";
import { Response } from 'express';

@Controller()
export class AuthController{

    constructor(private readonly authService:AuthService) {};
    @Get('login')
    @Render('login')
    getLogin(){
        return {title: 'Login'}
    }

    @Get('register')
    @Render('register')
    getRegister(){
        return {title: 'Register'}
    }

    @Post('login/submit')
    async submitLoginForm(
        @Body() loginUserDto: LoginUserDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const tokens = await this.authService.loginUser(loginUserDto);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        });

        return { accessToken: tokens.accessToken };
    }
    @Post('register/submit')
    async submitRegisterForm(@Body() body){
        await this.authService.registerUser(body);
    }

    @Post('refresh')
    async refreshToken(){

    }

}