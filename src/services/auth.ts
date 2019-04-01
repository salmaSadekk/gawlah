import { Injectable } from "@angular/core";

import { HTTP } from "@ionic-native/http";

@Injectable ()
export class AuthService{
   private isAuth =false ;
   httpPart = 'http://192.168.1.4' ;
   tourCreationUrl =  this.httpPart +'/Gawlah/backup/Tour_creation.php' ;
   tour_items =this.httpPart +'/Gawlah/backup/tour_items.php' ;
   get_items =this.httpPart +'/Gawlah/backup/get_items.php'  ;
   get_tours =this.httpPart +'/Gawlah/backup/get_tours.php' ;
   get_tour_items =this.httpPart + '/Gawlah/backup/get_tour_items.php' ;
   get_museums = this.httpPart +'/Gawlah/backup/get_museums.php'
   game_creation =this.httpPart +'/Gawlah/backup/game_creation.php' ;
   game_items = this.httpPart +'/Gawlah/backup/adding_game_items.php' ; 
    constructor(private http: HTTP){}
    signIn(data ){
      this.http.setRequestTimeout(120000) ;
      // const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
      console.log('req url :' + this.httpPart +'/Gawlah/backup/login.php') ;
 return this.http.post(this.httpPart +'/Gawlah/backup/login.php' ,
data,{}

 ) ;
    }
    SignUp(data){
       
  return this.http.post(this.httpPart +'/Gawlah/backup/Sign_up.php' ,
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