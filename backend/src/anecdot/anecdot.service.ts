import {Injectable} from '@nestjs/common'
import {DbService} from "../db/db.service";

@Injectable()
export class AnecdotService{

    constructor(private readonly dbService:DbService) {};
    async searchAnecdots(page, sort, order){
        try{
            const data = await this.dbService.searchAnecdots(page,sort, order);
            if(data) {
                return {
                    data:{
                        anecdots:data[0] ?? [{}],
                        total:data[1] ?? 0,
                    }
                }
            }
        }catch(error:any){
            console.log(error.message);
        }
    }

    async searchUserAnecdots(id, page, sort, order){
        try{
            const data = await this.dbService.searchUserAnecdots(id, page,sort, order);
            if(data) {
                return {
                    data:{
                        anecdots:data[0] ?? [{}],
                        total:data[1] ?? 0,
                    }
                }
            }
        }catch(error:any){
            console.log(error.message);
        }
    }
}