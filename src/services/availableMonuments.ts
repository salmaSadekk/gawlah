import { Items } from "../Models/Items";

export class availableMonuments {
  private  items:Items[] =[
        new Items('m1' ,'../../assets/imgs/anch amoun.jpg','Retrieved data from data base','Accessories Related Info','','',-1,1,'30') ,
        new Items('m2' ,'../../assets/imgs/status.jpg','Retrieved data from data base','Accessories Related Info','','',-1,1,'20') ,
        new Items('m3' ,'../../assets/imgs/m1.jpg','Retrieved data from data base','Accessories Related Info','','',2,1,'70') ,
        new Items('m4' ,'../../assets/imgs/m2.jpg','Retrieved data from data base','Accessories Related Info','','',2 ,1,'80')] ;

      getItems() {
          return this.items.slice() ;
      }
    }