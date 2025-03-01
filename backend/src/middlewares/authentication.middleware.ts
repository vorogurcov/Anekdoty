import {
    Injectable,
    NestMiddleware,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import {NextFunction,Request,Response} from "express";
import {JwtService} from "../jwt/jwt.service";
import {JsonWebTokenError, TokenExpiredError} from "@nestjs/jwt";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware{
    constructor(private readonly jwtService:JwtService) {}
    async use(req:Request, res:Response, next:NextFunction){
        try{
            const accessToken = req.body.accessToken

            if (!accessToken) {
                throw new UnauthorizedException("Access token is required");
            }

            await this.jwtService.verifyAccessToken(accessToken)
            next()
        }catch(error){
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException("Token expired");
            }

            if (error instanceof JsonWebTokenError) {
                throw new NotFoundException("Invalid token");
            }

            console.error('Unexpected authentication error:', error);
            throw new UnauthorizedException('Authentication failed');        }

    }
}