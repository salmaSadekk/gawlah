import { Museum } from "../Models/Museum";
import { Items } from "../Models/Items";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
@Injectable() 

export class MuseumsService{
  constructor(private authService :AuthService){
    this. ItemsRetrieve() ;
//this.authService.GetData('',{}) ;
  }
    private  items:Items[] =[] ;
   private  museums :Museum[] =[( new Museum('Egyptian Museum' ,'Contains an extensive collection of ancient Egyptian antiquities' ,this.items))];
   getMuseum() {
  
       return [...this.museums] ;
   }
   
   ItemsRetrieve() {
    var data = {
     museum_items :'museum_items'
    }
    this.authService.GetData('http://192.168.43.87:8000/Gawlah/backup/get_items.php' ,data).then(
      res=>{
        console.log('Items Retrival from data base :' +res.data) ;
        console.log(res.error) ;
        console.log(res.headers) ;
        console.log(res.status) ;
        console.log(res.url) ;
        let dataFromServer = JSON.parse(res.data) ;
        console.log(dataFromServer.length) ;
        for(var i =0 ;i<dataFromServer.length ; i++) {
 console.log(dataFromServer[i].item_name) ;
          this.items.push(  new Items(dataFromServer[i].item_id ,dataFromServer[i].item_name,'',dataFromServer[i].basic_info,'','','',-1,-1,'')) ;
        }
      }
    )
  }


}