import { Items } from "./Items";
import { Review } from "./Review";

export class Tours {
    constructor(public TourName :string ,public uid:string ,public theme :string,public name :string ,public CreatorImg:string ,public mainImage:string,public duration :string ,public Rating :string ,
        public items:any[] , public review:Review[] , public TicketPrice :number  ,public tour_info :string ,public creator_id:string) {

        }
}