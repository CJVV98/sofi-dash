import { Permission } from "./Permission";

export class Role {
    name!: string;
    permissions!: Array<Permission>;
    description!:String;
    id!:number;
}