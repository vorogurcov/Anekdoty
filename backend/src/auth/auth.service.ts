import {Injectable} from "@nestjs/common";
import {DbService} from "../db/db.service";
import {RegisterUserDto} from "../dto/RegisterUserDto";
import {LoginUserDto} from "../dto/LoginUserDto";

@Injectable()
export class AuthService{
    constructor(private readonly dbService:DbService){}

    async registerUser(registerUserDto:RegisterUserDto){
        await this.dbService.registerUser(registerUserDto);
    }

    async loginUser(loginUserDto:LoginUserDto){
        await this.dbService.loginUser(loginUserDto);
    }

}