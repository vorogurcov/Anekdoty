import {IsNotEmpty} from "class-validator";

export class SearchAnecdoteByTextDto{
    @IsNotEmpty()
    text!:string;
}