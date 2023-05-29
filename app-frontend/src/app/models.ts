export class todoItem {
    description:string;
    dueDate : Date;
    priority:number
    constructor(d:any,dat:any,prio:any){
        this.description = d
        this.dueDate = dat
        this.priority = prio
    }
}