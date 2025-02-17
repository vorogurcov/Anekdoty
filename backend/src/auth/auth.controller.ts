import {Get, Post, Controller} from '@nestjs/common'

@Controller()
export class AuthController{
    @Get('login')
    getLogin(){
        //TODO: Return login page
    }

    @Get('register')
    getRegister(){
        //TODO: Return register page
    }

    @Post('login/submit')
    submitLoginForm(){
        //TODO: Submit log form logic
    }
    @Post('register/submit')
    submitRegisterForm(){
        //TODO: Submit reg form logic
    }

}