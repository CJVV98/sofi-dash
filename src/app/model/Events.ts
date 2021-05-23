import { Resource } from "./Resource";
import { Notification } from './Notification';

export class Events {   
    id!: number;
    name!: string;
    start_date!: string;
    end_date!: string;
    state!: string;
    information!: string;
    place!: string;
    visibility!: string;
    resources: Resource[]=[];
    notifications:Notification[]=[];
    user_id!:number;

}