import {Module} from '@nestjs/common'
import {JwtService} from './jwt.service';
import {JwtModule as NestJwtModule} from "@nestjs/jwt";

@Module({
    imports:[NestJwtModule.register({secret:process.env.JWT_SECRET_KEY})],
    providers:[JwtService],
    exports:[JwtService]
})
export class JwtModule{}