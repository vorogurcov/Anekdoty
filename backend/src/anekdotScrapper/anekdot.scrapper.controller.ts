import {Controller,Get} from '@nestjs/common'
import {AnekdotScrapperService} from "./anekdot.scrapper.service";


@Controller('anekdotScrapper')
export class AnekdotScrapperController {
    constructor(private readonly anekdotServiceScrapper:AnekdotScrapperService){}

    @Get('scrap')
    async scrap(){
        return await this.anekdotServiceScrapper.scrap();
    }

    @Get('rubrics')
    async getRubrics(){
        return await this.anekdotServiceScrapper.getRubrics();
    }
}

