import { User } from './../models/register.model';
import { Component, OnInit,EventEmitter,ViewChild   } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../service/api.service';
import { ItemService } from '../service/ItemService';
import { ItemResponse } from '../models/ItemResponse';
import { AddPerticularComponent } from '../add-perticular/add-perticular.component';
import { Item } from '../models/Item';
import { MatDialog,MatDialogRef  } from '@angular/material/dialog';
import { MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {AppComponent} from '../app.component'


import * as moment from 'moment-timezone';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent implements OnInit  {

  selectedGender!: string;
  genders: string[] = ["Male", "Female"];
  packages: string[] = ["Apple", "Banana", "Carrot"];
  itemList: string[] = ["Apple", "Banana", "Carrot"];
  categoryList: string[] = ["Vegitables", "Fruits", "Kirana"];
  purchaseModeList:string[] = ["Amazon", "Fkipcart", "Market"];
  paymentModeList:string[] = ["Phone Pe", "Cash", "Netbanking"];
  response!:ItemResponse;
  currentItems!:ItemResponse;
  todayItems!:ItemResponse;
  thisMonthSum!:number;
  todaySum!:number;
  selectedDate:Date=new Date();
  dialogRef:any;
  isErrorExists:string='none';
  errorDetail:string='';
  errorObject:string='';
  itemCategory:string='';
  selectedItem:string;
  inputLink:string;
  showChild:string='none';
  defaultDate = new Date();
  futureDateFilter= (date: Date | null): boolean => {
    const today = new Date();
    return date ? date <= today : false;
  };
  @ViewChild(AppComponent) receiver: AppComponent;
  importantList: string[] = [
    "Toxic Fat reduction",
    "Energy and Endurance",
    "Building Lean Muscle",
    "Healthier Digestive System",
    "Sugar Craving Body",
    "Fitness"
  ]

  MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'MM/DD/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

  registrationForm!: FormGroup;
  private userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  constructor(private fb: FormBuilder, private api: ApiService, private itemService:ItemService,private toastService: NgToastService, private activatedRoute: ActivatedRoute,  private _dialog: MatDialog,private router: Router) {

  }
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      id:[''],
      itemName:[''],
      categoryName:[''],
      price: [''],
      purchaseDate:[],
      purchaseMode:[''],
      paymentMode: ['']
     
    });
    this.itemService.getPerticularsList("All")
      .subscribe(res => {
       this.itemList=  res.itemsList;
       this.categoryList=res.categoryList;
       this.purchaseModeList=res.purchaseModeList;
       this.paymentModeList=res.paymentModeList;
      });
   /* this.activatedRoute.params.subscribe(val => {
      this.userIdToUpdate = val['id'];
      if (this.userIdToUpdate) {
        this.isUpdateActive = true;
        this.api.getRegisteredUserId(this.userIdToUpdate)
          .subscribe({
            next: (res) => {
              this.fillFormToUpdate(res);
            },
            error: (err) => {
              console.log(err);
            }
          })
      }
    })*/
    this.activatedRoute.params.subscribe(val => {
      this.updateItem(JSON.parse(val['id']));
    })
    this.getItemsCurrentMonth();
    this.inputLink='home';
    this.showChild='none';
    this.receiver.isSelected('/home');
  }
  submit() {
    this.performValidations();
    if( this.errorDetail!='') {
      this.isErrorExists='block';
      return;
    } else {
         this.isErrorExists='none';
         this.errorObject='';
         this.errorDetail='';
    }
    this.itemService.addItem(this.registrationForm.value)
      .subscribe(res => {
        this.response=res;
        this.toastService.success({ detail: 'SUCCESS', summary: ''+this.response.message, duration: 3000 });
        this.registrationForm.reset();
         this.getItemsCurrentMonth();
         this.defaultDate = new Date(); 
      });
        this.itemCategory='undefined';
         this.registrationForm.reset();
  }

  getItemsCurrentMonth() {
     this.itemService.getItemsCurrentMonth()
      .subscribe(res => {
        this.currentItems=res;
        this.thisMonthSum=this.currentItems.totalSum;
      });
       this.itemService.getItemsCurrentDate()
      .subscribe(res => {
        this.todayItems=res;
        this.todaySum=this.todayItems.totalSum;
      });
  }

 receiveItems(newItem:string) {
      this.itemList.push(newItem);
  }
  getCategoryForItem() {
     this.itemService.getCategoryForItem(this.registrationForm.value.itemName)
      .subscribe(res => {
        this.registrationForm.value.categoryName=res.message;
        this.itemCategory=res.message;
        console.log("inside cat---"+ this.itemCategory)
      });
  }

  fillFormToUpdate(user: User) {
    this.registrationForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      package: user.package,
      important: user.important,
      haveGymBefore: user.haveGymBefore,
      enquiryDate: user.enquiryDate
    })
  }

   updateItem(item: Item) {
     this.itemCategory=item.categoryName;
     this.defaultDate=this.splitDate(item.purchaseDate);
     console.log("Default---"+ item.purchaseDate)
    this.registrationForm.setValue({
      id:item.id,
      itemName:item.itemName,
      price:item.price,
      categoryName:item.categoryName,
      purchaseDate:item.purchaseDate,
      purchaseMode:item.purchaseMode,
      paymentMode: item.paymentMode
    })
  }

  update() {
    this.api.updateRegisterUser(this.registrationForm.value, this.userIdToUpdate)
      .subscribe(res => {
        this.toastService.success({ detail: 'SUCCESS', summary: 'User Details Updated Successful', duration: 3000 });
        this.router.navigate(['list']);
        this.registrationForm.reset();
      });
  }

  calculateBmi(value: number) {
    const weight = this.registrationForm.value.weight; // weight in kilograms
    const height = value; // height in meters
    const bmi = weight / (height * height);
    this.registrationForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registrationForm.controls['bmiResult'].patchValue("Underweight");
        break;
      case (bmi >= 18.5 && bmi < 25):
        this.registrationForm.controls['bmiResult'].patchValue("Normal");
        break;
      case (bmi >= 25 && bmi < 30):
        this.registrationForm.controls['bmiResult'].patchValue("Overweight");
        break;

      default:
        this.registrationForm.controls['bmiResult'].patchValue("Obese");
        break;
    }
  }

   openAddEditEmpForm(perticularType:string) {
    this.dialogRef = this._dialog.open(AddPerticularComponent,{
  data: {
    type: perticularType
  }
});
 this.dialogRef.afterClosed().subscribe((newOption: string) => {
      if (newOption) {
        console.log(perticularType)
        this.itemService.getPerticularsList(perticularType)
      .subscribe(res => {
        switch(perticularType) {
          case 'item' : {
               this.itemList=  res.itemsList;
                this.itemService.getPerticularsList("All")
      .subscribe(res2 => {
       this.categoryList=res2.categoryList;
      });
               break;
          }
          case 'purchaseMode' : {
               this.purchaseModeList=  res.purchaseModeList;
                break;
          }
           case 'paymentMode' : {
               this.paymentModeList=  res.paymentModeList;
                break;
          }
        }
     });
      }
    });  
   }
   performValidations() {
     console.log("inside Validations");
     this.isErrorExists='none';
     this.errorObject='';
     this.errorDetail='';
    if(this.registrationForm.value.itemName=='' || this.registrationForm.value.itemName==null || this.registrationForm.value.itemName=='undefined') {
      this.errorObject="Item";
      this.errorDetail="Please Select "+this.errorObject;
    }
    if(this.registrationForm.value.price<=0.0) {
      if(this.errorObject!='') {
        this.errorObject=this.errorObject+', '+'price';
      } else {
        this.errorObject='price';
      }
      this.errorDetail="Please Enter "+this.errorObject;
    }
     if(this.registrationForm.value.purchaseDate=='' || this.registrationForm.value.purchaseDate==null || this.registrationForm.value.purchaseDate=='undefined') {
      if(this.errorObject!='') {
        this.errorObject=this.errorObject+', '+'Purchase Date';
      } else {
        this.errorObject='Purchase Date';
      }
      this.errorDetail="Please Enter "+this.errorObject;
    }
    if(this.registrationForm.value.purchaseMode=='' || this.registrationForm.value.purchaseMode==null || this.registrationForm.value.purchaseMode=='undefined') {
    if(this.errorObject!='') {
        this.errorObject=this.errorObject+', '+'Purchase Mode';
      } else {
        this.errorObject='Purchase Mode';
      }
      this.errorDetail="Please Enter "+this.errorObject;
    }
     if(this.registrationForm.value.paymentMode=='' || this.registrationForm.value.paymentMode==null || this.registrationForm.value.paymentMode=='undefined') {
     if(this.errorObject!='') {
        this.errorObject=this.errorObject+', '+'payment Mode';
      } else {
        this.errorObject='payment Mode';
      }
      this.errorDetail="Please Enter "+this.errorObject;
    }
   }
   splitDate(dateStr:string):Date {
     const dateParts = dateStr.split('/');

// dateParts will now be an array containing the date components in the order day, month, and year
     const day = dateParts[0];
     const month = dateParts[1];
     const year = dateParts[2];
     return new Date(month+'-'+day+'-'+year);
   }
}
