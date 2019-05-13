import { User } from "./user";

export class Review{
    constructor(public user:User , public time:string ,public content:string ,
        public rating :number , public review_id ) {}}