import { Tours } from "../Models/Tours";
import { Items } from "../Models/Items";
import {  Review } from "../Models/Review";
import { User } from "../Models/user";

export class ToursService {
  items:Items[] = [] ;
  tours:Tours[] =[] ;
    
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