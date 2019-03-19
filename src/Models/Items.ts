export class Items{
    constructor(public uid :string,public name :string , public imgUrl :string ,public BasicInfo :string ,public addedInfo:string,public audio:any ,public video :any , 
     public sequenceNum ,public parentnum:number ,public Time :string  ) {
this.sequenceNum =-1 ;
this.parentnum=-1 ;
     }
}