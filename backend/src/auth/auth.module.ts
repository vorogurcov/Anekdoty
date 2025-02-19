import {Module} from '@nestjs/common'
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {DbModule} from "../db/db.module";
import {JwtModule} from "../jwt/jwt.module";

@Module({
    imports:[DbModule, JwtModule],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService]
})
export class AuthModule{};
