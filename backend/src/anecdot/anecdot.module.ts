import {Module} from '@nestjs/common'
import {AnecdotService} from "./anecdot.service";
import {AnecdotController} from "./anecdot.controller";
import {DbModule} from "../db/db.module";
import {JwtModule} from "../jwt/jwt.module";

@Module({
    imports: [DbModule,JwtModule],
    providers:[AnecdotService],
    controllers:[AnecdotController],
})
export class AnecdotModule{};