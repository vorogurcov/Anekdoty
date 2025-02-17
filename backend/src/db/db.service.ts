import {Injectable} from '@nestjs/common'
import {DataSource} from "typeorm";
import {Anekdot} from "./entities/anekdot";
import {CreateAnekdotDto} from "../dto/CreateAnekdotDto";

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
            entities: [Anekdot],
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
}