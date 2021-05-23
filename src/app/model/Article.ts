export class Article {   
    id!: number;
    article_id!:number;
    date!: Date;
    title!: string;
    extract!: string;
    content!: string;
    state!:string;
    type!:string;
    visibility!:number;
    total_score!:number;
    keywords!: any[];
    author!:string;
    primary_image!:string;
}