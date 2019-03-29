import { Injectable } from "@angular/core";

import { HTTP } from "@ionic-native/http";

@Injectable ()
export class AuthService{
   private isAuth =false ;
   tourCreationUrl = 'http://192.168.1.9/Gawlah/backup/Tour_creation.php' ;
   tour_items ='http://192.168.1.9/Gawlah/backup/tour_items.php' ;
   get_items ='http://192.168.1.9/Gawlah/backup/get_items.php'  ;
   get_tours ='http://192.168.1.9/Gawlah/backup/get_tours.php' ;
   get_tour_items = 'http://192.168.1.9/Gawlah/backup/get_tour_items.php' ;
   get_museums = 'http://192.168.1.9/Gawlah/backup/Salma_new/get_museums.php'
   game_creation ='http://192.168.1.9/Gawlah/backup/game_creation.php' ;
    constructor(private http: HTTP){}
    signIn(data ){
      this.http.setRequestTimeout(120000) ;
      // const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
 return this.http.post('http://192.168.1.9/Gawlah/backup/login.php' ,
data,{}

 ) ;
    }
    SignUp(data){
       
  return this.http.post('http://192.168.1.9/Gawlah/backup/Sign_up.php' ,
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