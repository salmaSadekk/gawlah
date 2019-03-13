import { Items } from "../Models/Items";

export class availableMonuments {
  private  items:Items[] =[
        new Items('m1' ,'../../assets/imgs/anch amoun.jpg','Retrieved data from data base','Accessories Related Info','','',-1) ,
        new Items('m2' ,'../../assets/imgs/status.jpg','Retrieved data from data base','Accessories Related Info','','',-1) ,
        new Items('m3' ,'../../assets/imgs/m1.jpg','Retrieved data from data base','Accessories Related Info','','',2) ,
        new Items('m4' ,'../../assets/imgs/m2.jpg','Retrieved data from data base','Accessories Related Info','','',2)] ;

      getItems() {
          return this.items.slice() ;
      }
    }