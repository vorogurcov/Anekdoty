import {Injectable} from '@nestjs/common'
import {AnecdoteFilterDto} from "./dto/anecdote-filter.dto";
import {AnecdoteRepository} from "./repositores/anecdote.repository";
import {CreateAnecdoteDto} from "./dto/create-anecdote.dto";
import {User} from "../auth/entities/user.entity";
import {SearchAnecdoteByTextDto} from "./dto/search-anecdote-by-text.dto";

@Injectable()
export class AnecdoteService {

    constructor(private readonly anecdoteRepository:AnecdoteRepository) {};
    async searchAnecdotes(anecdoteFilterDto:AnecdoteFilterDto,user?:User){
        try{
            console.log(user)
            const data = await this.anecdoteRepository.searchAnecdotes(anecdoteFilterDto,user?.id)
            if(data) {
                return {
                    data:{
                        anecdotes:data[0] ?? [{}],
                        total:data[1] ?? 0,
                    }
                }
            }
        }catch(error:any){
            console.log(error.message);
        }
    }

    async saveUserAnecdote(user:User,anecdoteId:number){
        const wasSaved = await this.anecdoteRepository.saveUserAnecdote(user,anecdoteId);
        if(wasSaved)
            return {message: 'Anecdote successfully saved!'}
        return {message:'Anecdote was not saved!'}
    }

    async searchAnecdoteByText(searchAnecdoteByTextDto:SearchAnecdoteByTextDto){
        const anecdote = await this.anecdoteRepository.searchAnecdoteByText(searchAnecdoteByTextDto);
        if(anecdote === null)
            return {data: {
                anecdotes:'',
                    total:0}
                }
        return  {data:{
                anecdotes:anecdote,
                total:1,
                }
            }

    }
}