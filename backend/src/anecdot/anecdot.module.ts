import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common'
import {AnecdotService} from "./anecdot.service";
import {AnecdotController} from "./anecdot.controller";
import {DbModule} from "../db/db.module";
import {JwtModule} from "../jwt/jwt.module";
import {AuthenticationMiddleware} from "../middlewares/authentication.middleware";

@Module({
    imports: [DbModule,JwtModule],
    providers:[AnecdotService],
    controllers:[AnecdotController],
})
export class AnecdotModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthenticationMiddleware)
            .forRoutes('user/search','user/save');
    }
}