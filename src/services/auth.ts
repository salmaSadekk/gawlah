import { Injectable } from "@angular/core";

import { HTTP } from "@ionic-native/http";

@Injectable ()
export class AuthService{
   private isAuth =false ;
   tabs = false ;
   //httpPart = 'http://ec2-3-209-80-128.compute-1.amazonaws.com' ;
   httpPart ='http://192.168.1.8/Gawlah' ;

   tourCreationUrl =  this.httpPart +'/backup/Tour_creation.php' ;
   tour_items =this.httpPart +'/backup/tour_items.php' ;
   get_items =this.httpPart +'/backup/get_items.php'  ;
   get_tours =this.httpPart +'/backup/get_tours.php' ;
   get_tour_items =this.httpPart + '/backup/get_tour_items.php' ;
   get_museums = this.httpPart +'/backup/get_museums.php'
   game_creation =this.httpPart +'/backup/game_creation.php' ;
   game_items = this.httpPart +'/backup/adding_game_items.php' ; 
   search_by_theme = this.httpPart +'/backup/search_by_theme.php'  ;
   ProfilePicUpload= this.httpPart + '/backup/ProfilePicUpload.php'  ;
   Profile_data = this.httpPart + '/backup/Profile_data.php'  ;
   fav_tours =this.httpPart + '/backup/fav_tours.php' ;
   set_Review  = this.httpPart +'/backup/set_Review.php' ;
   get_Reviews = this.httpPart +'/backup/get_Reviews.php' ;
   get_games  = this.httpPart +'/backup/get_games.php' ;
   get_game_questions = this.httpPart + '/backup/get_game_questions.php' ;
   deleteTour = this.httpPart + '/backup/deleteTour.php' ;
   edit_tour = this.httpPart +  '/backup/edit_tour.php'  ;
   edit_game =this.httpPart + '/backup/edit_game.php' ;
   ChatTest = this.httpPart + '/backup/ChatTest.php'  ;
   follow_user = this.httpPart + '/backup/follow_user.php'  ;
   get_followers_following  = this.httpPart +'/backup/get_followers_following.php' ;
   get_notif =  this.httpPart +'/backup/get_notif.php' ;
   get_Tour =  this.httpPart +'/backup/get_Tour.php' ;
   deletegame  = this.httpPart +'/backup/deletegame.php' ;
    constructor(private http: HTTP){}
    signIn(data ){
      this.http.setRequestTimeout(120000) ;
      // const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      console.log('req url :' + this.httpPart +'/backup/login.php') ;
 return this.http.post(this.httpPart +'/backup/login.php' ,
data,{}

 ) ;
    }
    SignUp(data){
       
  return this.http.post(this.httpPart +'/backup/Sign_up.php' ,
 data , {}
 
  ) ;
     }
     setAuth(val:boolean){
this.isAuth =val ;
     }
     getAuth() {
        return this.isAuth ;
     }
   SendData(data ,url) {
      return this.http.post(url ,
      data , {}
      
       ) ;
   }
   GetData(url , data) {
      return this.http.get(url ,data ,{}) ;
   }


}