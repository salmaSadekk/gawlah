import { Injectable } from "@angular/core";

import { HTTP } from "@ionic-native/http";

@Injectable ()
export class AuthService{
   private isAuth =false ;
    constructor(private http: HTTP){}
    signIn(data ){
      this.http.setRequestTimeout(120000) ;
      // const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
 return this.http.post('http://192.168.1.11/android_login_api/login.php' ,
data,{}

 ) ;
    }
    SignUp(data){
       
  return this.http.post('http://192.168.1.11/android_login_api/register.php' ,
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
      return this.http.get(url ,{} ,{}) ;
   }


}