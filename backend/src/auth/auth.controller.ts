import {Get, Post, Controller, Render, Body, Res, Req} from '@nestjs/common'
import {AuthService} from './auth.service'
import {LoginUserDto} from "../dto/LoginUserDto";
import { Response, Request } from 'express';
import {JwtService} from "../jwt/jwt.service";

@Controller()
export class AuthController{

    constructor(private readonly authService:AuthService,
                private readonly jwtService:JwtService) {};
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
    async refreshToken(@Req() request: Request,
                       @Res({ passthrough: true }) res: Response){
        const refreshToken = request.cookies.refreshToken;

        try{
            const tokens = await this.jwtService.refreshTokens(refreshToken);


            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
            });

            return { accessToken: tokens.accessToken };
        }catch(error:any){
            return {error: 'Unathorized!'}
        }
    }

}