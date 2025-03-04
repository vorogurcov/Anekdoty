import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Equal, Like, Repository} from "typeorm";
import {Anecdote} from "../entities/anecdote.entity";
import {CreateAnecdoteDto} from "../dto/create-anecdote.dto";
import {User} from "../../auth/entities/user.entity";
import {AnecdoteFilterDto} from "../dto/anecdote-filter.dto";
import {SearchAnecdoteByTextDto} from "../dto/search-anecdote-by-text.dto";

@Injectable()
export class AnecdoteRepository{

    constructor(
        @InjectRepository(Anecdote)
        private repository:Repository<Anecdote>
    ){}


    async saveAnecdote(createAnecdoteDto: CreateAnecdoteDto) {
        try {
            const anecdote = await this.repository.create(createAnecdoteDto)

            await this.repository.save(anecdote);

            console.log("Anecdote saved:", anecdote);
        } catch (error) {
            console.error("Error saving anecdote:", error);
        }
    }


    async searchAnecdoteByText(searchAnecdoteByTextDto:SearchAnecdoteByTextDto){
        try{
            const {text} = searchAnecdoteByTextDto;
            return await this.repository.findOneBy({
                text:Like(`%${text}%`)
            })

        }catch(error:any){
            console.log(error.message)
            return null;
        }
    }

    async searchAnecdotes(anecdoteFilterDto:AnecdoteFilterDto,userId?:string){
        try{
            const {page,sort,order} = anecdoteFilterDto;
            console.log(userId)
            const findOptions = {
                skip:((page-1)*5),
                take:5,
            }

            if(userId) {
                findOptions['relations'] = {
                    users:true,

                }
                findOptions['where'] = {
                    users:{
                        id:userId,
                    },
                }
            }

            if(sort) findOptions['order'] =
                {
                    [sort]:order,
                }


            const [anecdotes,total] = await this.repository.findAndCount(findOptions)

            anecdotes.forEach((anecdote) => anecdote.users = [])

            return [anecdotes, total];
        }catch(error:any){
            console.log(error)
            console.log(error.message)
        }
    }

    async saveUserAnecdote(user: User, anecdoteId: number) {
        try {
            const anecdote = await this.repository.findOne({
                where: { id: anecdoteId },
                relations: ['users'], // Загружаем связанные users
            });

            if (!anecdote) {
                throw new Error('Anecdote not found');
            }

            // Проверяем, существует ли users, если нет — инициализируем
            anecdote.users = anecdote.users || [];

            // Проверяем, есть ли уже этот user в массиве, чтобы избежать дубликатов
            if (!anecdote.users.some(u => u.id === user.id)) {
                anecdote.users.push(user);
            }

            // Сохраняем изменения
            await this.repository.save(anecdote);

            return true;
        } catch (error: any) {
            console.log(error.message);
            return false;
        }
    }

}