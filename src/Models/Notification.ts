import { User } from "./user";

export class Notification{
    constructor(
        public notif_id : string ,
        public type:string ,
        public user :User,
        public tour_id:string ,
        public game_id :string ,
        public Notification :string){
        
    }
}