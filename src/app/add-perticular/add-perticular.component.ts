import { Component,OnInit ,Inject,Input ,EventEmitter,Output } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialog,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { PerticularService } from '../service/PerticularService';
import { GenericResponse } from '../models/GenericResponse';
import { ItemService } from '../service/ItemService';


@Component({
  selector: 'app-add-perticular',
  templateUrl: './add-perticular.component.html',
  styleUrls: ['./add-perticular.component.scss']
})
export class AddPerticularComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private fb: FormBuilder,private _dialog: MatDialog,private perticularService:PerticularService,private toastService: NgToastService,private _dialogRef: MatDialogRef<AddPerticularComponent>,private itemService:ItemService) {
      this.dialogData = data;
  }
  perticularType:string='';
  perticular:string='';
    response!:GenericResponse;
  addPerticularForm!: FormGroup;
  categoryList: string[] = ["Vegitables", "Fruits", "Kirana"];
   isItemEnabled:string="none";
    isCategoryEnabled:string='none';
    ispurchaseModeEnabled:string='none';
     ispaymentModeEnabled:string='none';
     isNewCategory:string='none';
     enteredPerticular:string='';
  @Input() dialogData: any;
  @Input() itemList:string[]=['Apple'];
  @Output() dataEvent = new EventEmitter<string>();
  ngOnInit() {
    this.addPerticularForm = this.fb.group({
      itemName:[''],
      category:[''],
      price: [''],
      purchaseDate:[],
      purchaseMode:[''],
      paymentMode: [''] 
    });
    switch(this.dialogData.type) {
      case 'item': {
         this.itemService.getPerticularsList("category")
      .subscribe(res => {
       this.categoryList=  res.categoryList;
      });
         this.isItemEnabled='block';
         this.isCategoryEnabled='block';
         this.ispurchaseModeEnabled='none';
         this.ispaymentModeEnabled='none';
         break;
      }
      case 'category': {
          this.isItemEnabled='none';
          this.isCategoryEnabled='block';
          this.ispurchaseModeEnabled='none';
          this.ispaymentModeEnabled='none';
           break; 
      }
      case 'purchaseMode' :{
           this.isItemEnabled='none';
           this.isCategoryEnabled='none';
           this.ispurchaseModeEnabled='block';
           this.ispaymentModeEnabled='none';
            break; 
      }
      case 'paymentMode' : {
        this.isItemEnabled='none';
        this.isCategoryEnabled='none';
        this.ispurchaseModeEnabled='none';
        this.ispaymentModeEnabled='block';
         break; 
      }
      default: { 
         this.isItemEnabled='none';
        this.isCategoryEnabled='none';
        this.ispurchaseModeEnabled='none';
        this.ispaymentModeEnabled='none';
      break; 
   } 
    }

  }
  submit() {
     switch(this.dialogData.type) {
       case 'item': {
         this.perticularService.addPerticular(this.dialogData.type,this.addPerticularForm.value.itemName+','+this.addPerticularForm.value.category)
      .subscribe(res => {
        this.response=res;
        this.toastService.success({ detail: 'SUCCESS', summary: ''+this.response.message, duration: 3000 });
        this.addPerticularForm.reset();
       this._dialogRef.close(true);
      });
     this.itemService.getItemsList()
      .subscribe(res => {
       this.itemList=  res;
      });
      this.itemService.getPerticularsList("category")
      .subscribe(res => {
       this.categoryList=  res.categoryList;
      });
      this.dataEvent.emit('TestItem');
      break;
       }
        case 'purchaseMode' :{
         this.perticularService.addPerticular(this.dialogData.type,this.addPerticularForm.value.purchaseMode)
      .subscribe(res => {
        this.response=res;
        this.toastService.success({ detail: 'SUCCESS', summary: ''+this.response.message, duration: 3000 });
        this.addPerticularForm.reset();
       this._dialogRef.close(true);
      });
      break;
        }
        case 'paymentMode' :{
         this.perticularService.addPerticular(this.dialogData.type,this.addPerticularForm.value.paymentMode)
      .subscribe(res => {
        this.response=res;
        this.toastService.success({ detail: 'SUCCESS', summary: ''+this.response.message, duration: 3000 });
        this.addPerticularForm.reset();
       this._dialogRef.close(true);
      });
      break;
        }
       default : {
         break;
       }
     }
  }
  categoryCheck(checked:boolean) {
   if(checked) {
     this.isCategoryEnabled='none';
      this.isNewCategory='block';
   } else {
      this.isCategoryEnabled='block';
      this.isNewCategory='none';
   }
  }
 
}
