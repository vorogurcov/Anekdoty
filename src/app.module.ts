import { Module } from '@nestjs/common';
import {AnekdotScrapperModule} from "./anekdotScrapper/anekdot.scrapper.module";
import {DbModule} from "./db/db.module";

@Module({
  imports: [DbModule, AnekdotScrapperModule],
})
export class AppModule {}
