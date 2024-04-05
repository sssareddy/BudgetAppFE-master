import { Component,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from '../service/ItemService';
import { PerticularsMap } from '../models/PerticularMgmt';
import { Perticular } from '../models/Perticular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-perticular-management',
  templateUrl: './perticular-management.component.html',
  styleUrls: ['./perticular-management.component.scss']
})
export class PerticularManagementComponent implements OnInit {
  constructor(private itemService:ItemService,private fb: FormBuilder,private toastService: NgToastService){}
  displayedColumns = ['editableName'];
 itemList:string[];
 perticulas:PerticularsMap[];
 perticulasList:Perticular[];
  dataSource:any ;
  showTable:string;
  perticularTypes:string[]=['item','category','purchaseMode','paymentMode'];
   perticularForm!: FormGroup;

  startEditing(element: any): void {
    element.editing = true;
  }

  stopEditing(element: any): void {
    element.editing = false;
  }
  savePerticular(element: PerticularsMap): void {
     let type:string='';
     type=this.perticularForm.value.perticularType
    const p =new Perticular(element.perticularId,type,element.name);
   this.itemService.savePerticular(p)
      .subscribe(res => {
         this.toastService.success({ detail: 'SUCCESS', summary: ''+res.message, duration: 3000 });
       this.perticulasList=  res.perticulasList;
       this.perticulas = this.perticulasList.map(perticular => ({
           name:perticular.perticularName,
            editable: false,
            perticularId:perticular.id

}));
 this.dataSource = new MatTableDataSource(this.perticulas);
      });
  }
   deletePerticular(id: number): void {
   this.itemService.deletePerticular(id)
      .subscribe(res => {
         this.toastService.success({ detail: 'SUCCESS', summary: ''+res.message, duration: 3000 });
       this.perticulasList=  res.perticulasList;
       this.perticulas = this.perticulasList.map(perticular => ({
           name:perticular.perticularName,
            editable: false,
            perticularId:perticular.id

}));
 this.dataSource = new MatTableDataSource(this.perticulas);
      });
  }
  getPerticularsList() {
     this.showTable='block';
     let type:string='';
     type=this.perticularForm.value.perticularType
   this.itemService.getPerticularsForMgmt(type)
      .subscribe(res => {
       this.perticulasList=  res.perticulasList;
       this.perticulas = this.perticulasList.map(perticular => ({
           name:perticular.perticularName,
            editable: false,
            perticularId:perticular.id
}));
 this.dataSource = new MatTableDataSource(this.perticulas);
      });
  }
   ngOnInit() {
       this.showTable='none';
         this.perticularForm = this.fb.group({
      perticularType:['']
     
    });
   }


 
}
