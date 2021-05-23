import { Role } from "./Role";

export class User {
    identification!: string;
    username!: string;
    name!: string;
    lastname!: string;
    email!: string;
    title!: string;
    institution!: string;
    phone1!: string;
    phone2!: string;
    address!: string;
    alternatename!: string;
    password!: string;
    id!: number;
    city!: string;
    country!: string;
    user!: string;
    state!:string;
    roles!:any[];
    photo!:string;
}