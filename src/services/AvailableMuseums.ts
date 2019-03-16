import { Museum } from "../Models/Museum";
import { Items } from "../Models/Items";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth";
@Injectable() 

export class MuseumsService{
  constructor(private authService :AuthService){
//this.authService.GetData('',{}) ;
  }
    private  items:Items[] =[
        new Items('m1' ,'../../assets/imgs/anch amoun.jpg','Retrieved data from data base','Accessories Related Info','','',-1,1,'30') ,
        new Items('m2' ,'../../assets/imgs/status.jpg','Retrieved data from data base','Accessories Related Info','','',-1,1,'20') ,
        new Items('m3' ,'../../assets/imgs/m1.jpg','Retrieved data from data base','Accessories Related Info','','',2,1,'70') ,
        new Items('m4' ,'../../assets/imgs/m2.jpg','Retrieved data from data base','Accessories Related Info','','',2 ,1,'80')] ;
   private  museums :Museum[] =[( new Museum('Egyptian Museum' ,'Contains an extensive collection of ancient Egyptian antiquities' ,this.items))];
   getMuseum() {
       return [...this.museums] ;
   }

}