import {Injectable, UnauthorizedException} from '@nestjs/common'
import {JsonWebTokenError, JwtService as NestJwtService, TokenExpiredError} from "@nestjs/jwt";

@Injectable()
export class JwtService{
    constructor(private readonly nestJwtService:NestJwtService){};

    async refreshTokens(refreshToken){
        const { iat, exp, ...cleanUserData } = this.nestJwtService.decode(refreshToken);
        return await this.generateTokens(cleanUserData);
    }

    async generateTokens(userData){
        const accessToken = await this.nestJwtService.signAsync(userData,{ expiresIn: '1m' });
        const refreshToken = await this.nestJwtService.signAsync(userData,{
            secret:process.env.JWT_REFRESH_SECRET_KEY,
            expiresIn: '10080m',
        });
        return {accessToken,refreshToken}
    }

    async verifyAccessToken(accessToken){
        try{
            await this.nestJwtService.verifyAsync(accessToken,{
                secret:process.env.JWT_ACCESS_SECRET_KEY,
            })
        }catch(error){
            console.log('Access token was not verified!')
            throw error;
        }
    }

    async verifyRefreshToken(refreshToken){
        try{
            await this.nestJwtService.verifyAsync(refreshToken,{
                secret:process.env.JWT_REFRESH_SECRET_KEY,
            })
        }catch(error){
            console.log('Refresh token was not verified!')
            throw error;
        }
    }

    async decodeToken(Token){
        try{
            return await this.nestJwtService.decode(Token)
        }catch(error){
            throw error
        }
    }

}