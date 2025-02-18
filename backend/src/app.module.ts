import { Module } from '@nestjs/common';
import {AnekdotScrapperModule} from "./anekdotScrapper/anekdot.scrapper.module";
import {DbModule} from "./db/db.module";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [DbModule, AnekdotScrapperModule,AuthModule],
})
export class AppModule {}
