import {Injectable} from '@nestjs/common'
import {DataSource} from "typeorm";
import {Anekdot} from "./entities/anekdot";
import {User} from "./entities/user";
import {CreateAnekdotDto} from "../dto/CreateAnekdotDto";
import {RegisterUserDto} from "../dto/RegisterUserDto";
import {LoginUserDto} from "../dto/LoginUserDto";
import {UserRefreshJwt} from "./entities/jwt";

@Injectable()
export class DbService{
    private readonly appDataSource;



    constructor() {
        this.appDataSource = new DataSource({
            type: process.env.DB_TYPE as any ?? "postgres",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [Anekdot,User,UserRefreshJwt],
            synchronize: true,
        });

    }
    async initialize() {
        if (!this.appDataSource.isInitialized) {
            try {
                await this.appDataSource.initialize();
                console.log('Database initialized!');
            } catch (error) {
                console.error('Error initializing database:', error);
                throw error;
            }
        }
    }
    async onModuleInit() {
        await this.initialize();
    }


    async saveAnekdot(createAnekdotDto: CreateAnekdotDto) {
        try {
            const anekdot = new Anekdot();
            anekdot.rubricName = createAnekdotDto.rubricName ?? '';
            anekdot.text = createAnekdotDto.text ?? '';
            anekdot.rating = parseInt(createAnekdotDto.rating ?? '0');

            await this.appDataSource.manager.save(anekdot);
            console.log("Anekdot saved:", anekdot);
        } catch (error) {
            console.error("Error saving anekdot:", error);
        }
    }

    async registerUser(registerUserDto: RegisterUserDto){
        try{
            const newUser = new User(registerUserDto);
            await this.appDataSource.manager.save(newUser);
            console.log('Save new user with data', newUser);
        }catch(error: any){
            console.log(error.message);
        }
    }

    async loginUser(loginUserDto: LoginUserDto){
        try{
            const result = await this.appDataSource.manager.find(User, {
                where:{
                    email:loginUserDto.email,
                    password:loginUserDto.password,
                }
            })

            if(result.length > 0)
                return result[0]['id']

            return null;
        }catch(error: any){
            console.log(error.message);
        }
    }

    async searchAnecdots(page, sort, order){
        try{
            const [anecdots, total] = await this.appDataSource.manager.findAndCount(Anekdot,{
                skip:(page - 1) * 10,
                take:10,
                order:{
                    [sort]:order,
                }
            })

            return [anecdots, total];
        }catch(error:any){
            console.log(error.message)
        }
    }

    async searchUserAnecdots(id, page, sort, order){
        try{
            const [anecdots, total] = await this.appDataSource
                .createQueryBuilder(Anekdot, "a")
                .innerJoin("a.users", "user")
                .where("user.id = :id", { id:id })
                .select([
                    "a.id",
                    "a.rubricName",
                    "a.text",
                    "a.rating"
                ])
                .orderBy(`a.${sort}`, order)
                .skip((page - 1) * 10)
                .take(10)
                .getManyAndCount();
            return [anecdots, total];
        }catch(error:any){
            console.log(error.message)
        }
    }

    async saveUserAnecdot(user_id, anecdot_id){
        try{
            await this.appDataSource
                .getRepository(User)
                .createQueryBuilder()
                .relation(User, 'anecdots')
                .of(user_id)
                .add(anecdot_id);

            return true;
        }catch(error:any){
            console.log(error.message);
            return false;
        }
    }

    async saveRefreshToken(user_id,refreshToken){
        try{
            await this.appDataSource.manager.save(UserRefreshJwt, {
                user_id: user_id,
                refreshJwt: refreshToken,
            });

            return true;
        }catch(error:any){
            console.log(error.message)
            return false;
        }
    }
}