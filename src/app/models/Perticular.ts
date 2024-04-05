export class Perticular {
  id!:number;
  perticularType!: string;
  perticularName!: string;
  constructor(pid: number,pType:string,pName:string) {
    // The constructor is called when an instance of the class is created
    this.id=pid;
    this.perticularType=pType;
     this.perticularName=pName;
  }
}
