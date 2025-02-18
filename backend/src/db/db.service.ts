import {Injectable} from '@nestjs/common'
import {DataSource} from "typeorm";
import {Anekdot} from "./entities/anekdot";
import {User} from "./entities/user";
import {CreateAnekdotDto} from "../dto/CreateAnekdotDto";
import {RegisterUserDto} from "../dto/RegisterUserDto";
import {LoginUserDto} from "../dto/LoginUserDto";

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
            entities: [Anekdot,User],
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

    async getAnekdoty(){
        try{
            return await this.appDataSource.manager.find(Anekdot);
        }catch(error:any){
            console.log(error.message);
            return 'Can not get Anekdoty!';
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
                console.log(result);

            return null;
        }catch(error: any){
            console.log(error.message);
        }
    }
}