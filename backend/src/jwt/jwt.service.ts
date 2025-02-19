import {Injectable, UnauthorizedException} from '@nestjs/common'
import {JwtService as NestJwtService} from "@nestjs/jwt";

@Injectable()
export class JwtService{
    constructor(private readonly nestJwtService:NestJwtService){};

    async refreshTokens(refreshToken){
        const wasVerified = await this.nestJwtService.verifyAsync(refreshToken,{
            secret:process.env.JWT_REFRESH_SECRET_KEY,
        })

        if(wasVerified) {
            const userData = this.nestJwtService.decode(refreshToken);
            return await this.generateTokens(userData);
        }

        throw new UnauthorizedException('Неверные данные для входа');
    }

    async generateTokens(userData){
        const accessToken = await this.nestJwtService.signAsync(userData);
        const refreshToken = await this.nestJwtService.signAsync(userData,{
            secret:process.env.JWT_REFRESH_SECRET_KEY,
        });
        return {accessToken,refreshToken}
    }

}