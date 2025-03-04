
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
    page!:number;
    sort!:sortType;

    order!:orderType;

}