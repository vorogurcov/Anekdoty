import {Get, Post, Controller, Render, Body} from '@nestjs/common'
import {AuthService} from './auth.service'

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
    async submitLoginForm(@Body() body){
        await this.authService.loginUser(body);
    }
    @Post('register/submit')
    async submitRegisterForm(@Body() body){
        await this.authService.registerUser(body);
    }

}