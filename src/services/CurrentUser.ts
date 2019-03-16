import { User } from "../Models/user";
import { Tours } from "../Models/Tours";
import { Review } from "../Models/Review";
import { Items } from "../Models/Items";

export class CurrentUser {
    private items:Items[] =[
        new Items('anch amoum' ,'../../assets/imgs/anch amoun.jpg','Retrieved data from data base','Accessories Related Info','a','v',2,1,'2') ,
        new Items('anch amoum' ,'../../assets/imgs/status.jpg','Retrieved data from data base','Accessories Related Info','a','v',2,2,'2') ,
        new Items('m1' ,'../../assets/imgs/m1.jpg','Retrieved data from data base','Accessories Related Info','a','v',2,3,'2') ,
        new Items('m2' ,'../../assets/imgs/m2.jpg','Retrieved data from data base','Accessories Related Info','a','v',2,5,'3')] ;
    private favTours:Tours[] =[new Tours('Accessories','Egyptian Museum','../../assets/imgs/UserProfile.png' ,'../../assets/imgs/egyptian Museum.png','17min','5',this.items,[ new Review('../../assets/imgs/UserProfile.png' ,'1d ago','An amazing Tour')]) ,
    new Tours('Sports','Egyptian Museum','../../assets/imgs/UserProfile.png' ,'../../assets/imgs/egyMuse.jpg','17min','5.5',[new Items('statue','../../assets/imgs/status.jpg','Retrieved data from data base','Sports related info ','audio','video',2,2 ,'2')],[new Review('../../assets/imgs/UserProfile.png' ,'1d ago','An amazing Tour')])] ;
    private currentUser :User =new User ('Salma','',this.favTours ,this.favTours ,['English','French','German'],20 ) ;
    getUser() {
        return {...this.currentUser} ;
    }

}