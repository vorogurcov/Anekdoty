import {IsEnum,IsNotEmpty, IsPositive} from "class-validator";
import {Type} from "class-transformer";

enum sortType{
    rating='rating',
    text='text',
    rubricName='rubricName'
}

enum orderType{
    desc='DESC',
    asc='ASC',
}

export class AnecdoteFilterDto{
    @Type(() => Number)
    @IsPositive()
    page!:number;

    @IsEnum(sortType)
    @IsNotEmpty()
    sort!:sortType;

    @IsEnum(orderType)
    @IsNotEmpty()
    order!:orderType;

}