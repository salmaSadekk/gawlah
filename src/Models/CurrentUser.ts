import { Tours } from "./Tours";

export class CurrentUser{
   constructor(private profilePicture:string ,private name :string ,private favTours:Tours[] ,private ownTours:Tours[] )  {

   }
}