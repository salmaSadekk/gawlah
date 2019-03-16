import { Tours } from "./Tours";

export class User {
    constructor(public name :string , public profilePic :string ,public favoriteTours :Tours[] , public ownTours:Tours[] , public languages :string [],
       public  score :number){

        } }