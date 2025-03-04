import {Injectable} from '@nestjs/common'
import {Rubric} from '../interfaces/rubric.interface'
import axios from "axios";
import * as cheerio from 'cheerio'
import {CreateAnecdoteDto} from "../anecdote/dto/create-anecdote.dto";
import {AnecdoteRepository} from "../anecdote/repositores/anecdote.repository";
@Injectable()
export class AnecdoteScrapperService{

    constructor(
        private anecdoteRepository:AnecdoteRepository) {}

    async getRubrics() {
        const url = "https://anekdoty.ru/";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        console.log("Done!");

        let rubrics: Rubric[] = [];
        $(".list li a").each((_, el) => {
            const link = $(el).attr("href");
            if (link && link.includes("/")) {
                rubrics.push({
                    name: $(el).text().trim(),
                    url: `${link}`
                });
            }
        });

        return rubrics;
    }

    private async getAnecdotesByRubric(rubric: Rubric): Promise<CreateAnecdoteDto[]> {
        let anekdoty: CreateAnecdoteDto[] = [];
        let page = 1;

        while (true) {
            const url = `${rubric.url}${page === 1 ? "" : page + "/"}`;
            console.log(`Сканирую: ${url}`);

            try {
                const { data } = await axios.get(url);
                const $ = cheerio.load(data);
                let hasAnecdotes = false;

                const elements = $(".holder");
                for (let i = 0; i < elements.length; i++) {

                    hasAnecdotes = true;
                    const el = elements[i];
                    const text = $(el).find(".holder-body p").html()
                        ?.replace(/<br\s*\/?>/gi, "\n")
                        .replace(/<a [^>]*>(.*?)<\/a>/gi, "$1")
                        .trim() || "";

                    const rating = $(el).find(".like-counter").text()?.trim() || "0";

                    anekdoty.push({
                        rubricName: rubric.name,
                        text: text,
                        rating: Number(rating)
                    });

                }

                if (!hasAnecdotes) {
                    console.log(`Анекдоты не найдены на странице ${url}, прекращаю сканирование.`);
                    break;
                }

                page++;

            } catch (error: any) {
                if (error.response?.status === 404) {
                    console.log(`Страница ${url} не найдена (404). Остановка сканирования.`);
                    break;
                }
                console.log(`Ошибка при загрузке ${url}:`, error.message);
                break;
            }
        }
        return anekdoty;
    }


    async scrap(){
        try{
            const rubrics = await this.getRubrics();
            for (const rubric of rubrics){
                const anekdoty = await this.getAnecdotesByRubric(rubric);
                for (const anekdot of anekdoty) {
                    console.log(`Saving anekdot ${anekdot}`);
                    await this.anecdoteRepository.saveAnecdote(anekdot);
                }
                console.log(`Done scrapping rubric: ${rubric}`);
            }
            return 'Done scrapping!'
        }catch(error:any){
            console.log(error.message);
            return 'Error while scrapping!'
        }
    }



}