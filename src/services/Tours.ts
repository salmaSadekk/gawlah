import { Tours } from "../Models/Tours";
import { Items } from "../Models/Items";
import {  Review } from "../Models/Review";
import { User } from "../Models/user";

export class ToursService {
  items:Items[] =[
     new Items('' ,'anch amoum' ,'../../assets/imgs/anch amoun.jpg','Retrieved data from data base','Accessories Related Info','a','v',2,1,'2') ,
     new Items('','anch amoum' ,'../../assets/imgs/status.jpg','Retrieved data from data base','Accessories Related Info','a','v',2,2,'2') ,
     new Items('','m1' ,'../../assets/imgs/m1.jpg','Retrieved data from data base','Accessories Related Info','a','v',2,3,'2') ,
     new Items('','m2' ,'../../assets/imgs/m2.jpg','Retrieved data from data base','Accessories Related Info','a','v',2,5,'3')] ;
    tours:Tours[] =[new Tours('','xdxdxdxd','Accessories','Egyptian Museum','../../assets/imgs/UserProfile.png' ,'../../assets/imgs/egyptian Museum.png','17min','5',this.items,[ new Review(new User ('','Salma','../../assets/imgs/UserProfile.png',[] ,[],['English','French','German'],20 ) ,'1d ago','An amazing Tour')],9) ,
    new Tours('','hhhhhhh','Sports','Egyptian Museum','../../assets/imgs/UserProfile.png' ,'../../assets/imgs/egyMuse.jpg','17min','5.5',[new Items('','statue','../../assets/imgs/status.jpg','Retrieved data from data base','Sports related info ','audio','video',2,2 ,'2')],[new Review(new User ('','Salma','../../assets/imgs/UserProfile.png',[] ,[],['English','French','German'],20 ) ,'1d ago','An amazing Tour')],5)] ;
    
  // we will get the data from database from here
  getTours() {
     return this.tours.slice()
  }
  addTour(tour:Tours) {
      this.tours.push(tour) ;
  }
  addReviewToTour(uid ,review,rating){
     let tour =this.tours.find(
       tour=>{
      return tour.uid == uid ;
       }
     ) ;
     
     if(rating!=0)
     tour.Rating = rating; //8 should be replaced with the total number of Ratings
     tour.review.push(review) ;


  }
  getReviews(uid) {
    return  this.tours.find(
      tour=>{
     return tour.uid == uid ;
      }
    ).review.slice() ;

  }


}