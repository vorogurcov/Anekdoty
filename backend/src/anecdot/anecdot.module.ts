import {Module} from '@nestjs/common'
import {AnecdotService} from "./anecdot.service";
import {AnecdotController} from "./anecdot.controller";
import {DbModule} from "../db/db.module";

@Module({
    imports: [DbModule],
    providers:[AnecdotService],
    controllers:[AnecdotController],
})
export class AnecdotModule{};