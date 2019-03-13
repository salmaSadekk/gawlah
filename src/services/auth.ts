import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable ()
export class AuthService{
   private isAuth =false ;
    constructor(private http:HttpClient){}
    signIn(data ){
       const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
 return this.http.post('http://192.168.1.8/android_login_api/login.php' ,
JSON.stringify(data) , _options

 ) ;
    }
    SignUp(data){
        const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  return this.http.post('http://192.168.1.8/android_login_api/register.php' ,
 data , _options
 
  ) ;
     }
     setAuth(val:boolean){
this.isAuth =val ;
     }
     getAuth() {
        return this.isAuth ;
     }
}