import {Injectable, UnauthorizedException} from "@nestjs/common";
import {DbService} from "../db/db.service";
import {RegisterUserDto} from "../dto/RegisterUserDto";
import {LoginUserDto} from "../dto/LoginUserDto";
import {JwtService} from "../jwt/jwt.service";

@Injectable()
export class AuthService{
    constructor(private readonly dbService:DbService,
                private readonly jwtService:JwtService){}

    async registerUser(registerUserDto:RegisterUserDto){
        await this.dbService.registerUser(registerUserDto);
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const user_id = await this.dbService.loginUser(loginUserDto);
        if (user_id !== null) {
            const userData = {
                user_id,
                refreshedAt:Date.now(),
            }
            const tokens = await this.jwtService.generateTokens(userData);
            await this.dbService.saveRefreshToken(userData, tokens.refreshToken);
            return tokens;
        }
        throw new UnauthorizedException('Неверные данные для входа');
    }

}