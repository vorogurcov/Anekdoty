import {IsNotEmpty} from "class-validator";

export class CreateAnecdoteDto {
    @IsNotEmpty()
    rubricName?:string;

    @IsNotEmpty()
    text?:string;

    @IsNotEmpty()
    rating?:number;
}