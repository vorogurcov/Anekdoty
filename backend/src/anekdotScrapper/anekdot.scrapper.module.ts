import {Module} from '@nestjs/common'
import {AnekdotScrapperController} from "./anekdot.scrapper.controller";
import {DbModule} from "../db/db.module";
import {AnekdotScrapperService} from "./anekdot.scrapper.service";

@Module({
    imports:[DbModule],
    controllers:[AnekdotScrapperController],
    providers:[AnekdotScrapperService],
})
export class AnekdotScrapperModule{};