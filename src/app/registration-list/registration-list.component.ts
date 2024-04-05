import { Router } from '@angular/router';
import { User } from './../models/register.model';
import { ApiService } from './../service/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgConfirmService } from 'ng-confirm-box';
import { NgToastService } from 'ng-angular-popup';
import { ItemService } from '../service/ItemService';
import { ItemResponse } from '../models/ItemResponse';
import { Item } from '../models/Item';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MultiSelectRequest } from '../models/MultiSelectRequest';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {

  public users!: User[];
  public itemsList!: Item[];
  searchResponse!:ItemResponse
  dataSource!: MatTableDataSource<User>;
  itemDataSource!: MatTableDataSource<Item>;
  showTable:string;
  enableItem:string='none';
  enableCategory:string='none';
  enablepurchaseMode:string='none';
  enablepaymentMode:string='none';
  enableMultiSelectItem:string='none';
  enableMultiSelectCategory:string='none';
  enableMultiSelectpurchaseMode:string='none';
  enableMultiSelectpaymentMode:string='none';
  enableMultiSelectMonth:string='none';
  enablefromDate:string='none';
  enabletoDate:string='none';
  searchForm!: FormGroup;
  perticular:string;
  selectedPerticular:string;
  itemList: string[] = ["Apple", "Banana", "Carrot"];
  searchList: string[] = ["Apple", "Banana", "Carrot"];
  categoryList: string[] = ["Vegitables", "Fruits", "Kirana"];
  purchaseModeList:string[] = ["Amazon", "Fkipcart", "Market"];
  paymentModeList:string[] = ["Phone Pe", "Cash", "Netbanking"];
  monthList:string[]=['January','February','March','April','May','June','July','August','September','October','November','December'];
  //displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'mobile', 'bmiResult', 'gender', 'package', 'enquiryDate', 'action'];
  displayedColumns: string[] = ['itemName', 'category', 'price', 'purchaseDate', 'purchaseMode', 'paymentMode','action'];
  perticularTypes:string[]=['Month','Date','item','category','purchaseMode','paymentMode']
  enableMonth:string;
  month:string;
  isSearchEnable:string='none';
  isMultiSelectSearchEnable:string='none';
  totalSum:number;
  isError:string='none';
  errorDetails:string;
  multiSelect:boolean=false;
  multiSelectCheck:String="none";
  multiSelectRequest:MultiSelectRequest=new MultiSelectRequest();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private fb: FormBuilder,private apiService: ApiService, private router: Router, private confirmService: NgConfirmService, private toastService: NgToastService,private itemService:ItemService) { }

  ngOnInit() {
    this.searchByMonth();
          this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='none';
          this.enabletoDate='none';
          this.enableMonth='none';
          this.multiSelectCheck="none";
          this.isSearchEnable='none';
          this.isMultiSelectSearchEnable='none';
          this.totalSum=0;
          this.enableMultiSelectItem='none';
          this.enableMultiSelectCategory='none';
          this.enableMultiSelectpurchaseMode='none';
          this.enableMultiSelectpaymentMode='none';
          this.enableMultiSelectMonth='none';
          this.itemService.getPerticularsList("All")
      .subscribe(res => {
       this.itemList=  res.itemsList;
       this.categoryList=res.categoryList;
       this.purchaseModeList=res.purchaseModeList;
       this.paymentModeList=res.paymentModeList;
      });
     this.showTable='none'
     this.searchForm = this.fb.group({
      month:[''],
      perticularType:[''],
      itemName:[''],
      categoryName:[''],
      purchaseMode:[''],
      paymentMode:[''],
      fromDate:[''],
      toDate:[''],
      selectedMonths:[],
      selectedItems:[],
      selectedCatogiries:[],
      selectedPurchaseModes:[],
      selectedPaymentModes:[]
     
    });
  }

  getUsers() {
    this.apiService.getRegisteredUser()
      .subscribe({
        next: (res) => {
          this.users = res;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
  searchByMonth() {
    this.itemService.searchBudgetByMonth(2023,'September')
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
  /*edit(id: number) {
    this.router.navigate(['update', id])
  }*/
  edit(item: Item) {
     const objectString = JSON.stringify(item);
    this.router.navigate(['update', objectString],{ skipLocationChange: true })
  }

  deleteUser(id: number) {
    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {
        //your logic if Yes clicked
        this.apiService.deleteRegistered(id)
          .subscribe({
            next: (res) => {
              this.toastService.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000 });
              this.getUsers();
            },
            error: (err) => {
              this.toastService.error({ detail: 'ERROR', summary: 'Something went wrong!', duration: 3000 });
            }
          })
      },
      () => {
        //yor logic if No clicked
      })

  }
  deleteBudget(id: number) {
    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {
        //your logic if Yes clicked
        this.itemService.deleteBudget(id,this.searchResponse.itemsList)
          .subscribe({
            next: (res) => {
              this.toastService.success({ detail: 'SUCCESS', summary: 'Deleted Successfully', duration: 3000 });
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
          this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
            },
            error: (err) => {
              this.toastService.error({ detail: 'ERROR', summary: 'Something went wrong!', duration: 3000 });
            }
          })
      },
      () => {
        //yor logic if No clicked
      })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.itemDataSource.filter = filterValue.trim().toLowerCase();

    if (this.itemDataSource.paginator) {
      this.itemDataSource.paginator.firstPage();
    }
  }
  submitSearch() {
    this.enableMultiSelectItem='none';
            this.enableMultiSelectCategory='none';
            this.enableMultiSelectpurchaseMode='none';
            this.enableMultiSelectpaymentMode='none';
             this.enableMultiSelectMonth='none'
    this.errorDetails='';
      this.isError='none';
     switch(this.searchForm.value.perticularType) {
      case "Month" :{
        if(this.searchForm.value.month=='undefined' || this.searchForm.value.month==null || this.searchForm.value.month=='') {
          this.isError='block'
          this.errorDetails="Please select Month";
          return;
        }
             this.itemService.searchBudget(this.searchForm.value.perticularType,this.searchForm.value.month,'Fri Sep 01 2023 00:00:00 GMT+0530 (India Standard Time)','Fri Sep 01 2023 00:00:00 GMT+0530 (India Standard Time)')
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
          this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
       case "item" :{
        if(this.searchForm.value.itemName=='undefined' || this.searchForm.value.itemName==null || this.searchForm.value.itemName=='') {
          this.isError='block'
          this.errorDetails="Please select Item";
          return;
        }
        if(this.searchForm.value.fromDate=='undefined' || this.searchForm.value.fromDate==null || this.searchForm.value.fromDate=='') {
             console.log('from Date==='+this.searchForm.value.fromDate);
          this.isError='block'
          this.errorDetails="Please select from Date";
            return;
        }
        if(this.searchForm.value.toDate=='undefined' || this.searchForm.value.toDate==null || this.searchForm.value.toDate=='') {
            this.searchForm.value.toDate= this.searchForm.value.fromDate;
        }
             this.itemService.searchBudget(this.searchForm.value.perticularType,this.searchForm.value.itemName,this.searchForm.value.fromDate,this.searchForm.value.toDate)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
          this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
       case "Date" :{
          if(this.searchForm.value.fromDate=='undefined' || this.searchForm.value.fromDate==null || this.searchForm.value.fromDate=='') {
          this.isError='block'
          this.errorDetails="Please select from Date";
          return;
        }
        if(this.searchForm.value.toDate=='undefined' || this.searchForm.value.toDate==null || this.searchForm.value.toDate=='') {
            this.searchForm.value.toDate= this.searchForm.value.fromDate;
        }
             this.itemService.searchBudget(this.searchForm.value.perticularType,'date',this.searchForm.value.fromDate,this.searchForm.value.toDate)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
          this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
           this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
       case "category" :{
          if(this.searchForm.value.categoryName=='undefined' || this.searchForm.value.categoryName==null || this.searchForm.value.categoryName=='') {
          this.isError='block'
          this.errorDetails="Please select from Category";
          return;
        }
        if(this.searchForm.value.fromDate=='undefined' || this.searchForm.value.fromDate==null || this.searchForm.value.fromDate=='') {
          this.isError='block'
          if(this.errorDetails=='')
          {
          this.errorDetails="Please select from from Date";
          }
          else {
             this.errorDetails+','+' from Date'
          }
          return;
        }
         if(this.searchForm.value.toDate=='undefined' || this.searchForm.value.toDate==null || this.searchForm.value.toDate=='') {
            this.searchForm.value.toDate= this.searchForm.value.fromDate;
        }
             this.itemService.searchBudget(this.searchForm.value.perticularType,this.searchForm.value.categoryName,this.searchForm.value.fromDate,this.searchForm.value.toDate)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
           this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
      case "purchaseMode" :{
        if(this.searchForm.value.purchaseMode=='undefined' || this.searchForm.value.purchaseMode==null || this.searchForm.value.purchaseMode=='') {
          this.isError='block'
          this.errorDetails="Please select from purchaseMode";
          return;
        }
        if(this.searchForm.value.fromDate=='undefined' || this.searchForm.value.fromDate==null || this.searchForm.value.fromDate=='') {
          this.isError='block'
          if(this.errorDetails=='')
          {
          this.errorDetails="Please select from from purchaseMode";
          }
          else {
             this.errorDetails+','+' purchaseMode'
          }
          return;
        }
         if(this.searchForm.value.toDate=='undefined' || this.searchForm.value.toDate==null || this.searchForm.value.toDate=='') {
            this.searchForm.value.toDate= this.searchForm.value.fromDate;
        }
             this.itemService.searchBudget(this.searchForm.value.perticularType,this.searchForm.value.purchaseMode,this.searchForm.value.fromDate,this.searchForm.value.toDate)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
           this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
      case "paymentMode" :{
        if(this.searchForm.value.paymentMode=='undefined' || this.searchForm.value.paymentMode==null||this.searchForm.value.paymentMode=='') {
          this.isError='block'
          this.errorDetails="Please select from paymentMode";
          return;
        }
        if(this.searchForm.value.fromDate=='undefined' || this.searchForm.value.fromDate==null || this.searchForm.value.fromDate=='') {
          this.isError='block'
          if(this.errorDetails=='')
          {
          this.errorDetails="Please select from from paymentMode";
          }
          else {
             this.errorDetails+','+' paymentMode'
          }
          return;
        }
         if(this.searchForm.value.toDate=='undefined' || this.searchForm.value.toDate==null || this.searchForm.value.toDate=='') {
            this.searchForm.value.toDate= this.searchForm.value.fromDate;
        }
             this.itemService.searchBudget(this.searchForm.value.perticularType,this.searchForm.value.paymentMode,this.searchForm.value.fromDate,this.searchForm.value.toDate)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
           this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
      default : {
         this.isSearchEnable='none';
         this.isMultiSelectSearchEnable='none'
         this.showTable='none';
      }

  }
  this.searchForm.reset();
    this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='none';
          this.enabletoDate='none';
          this.enableMonth='none';
          this.isSearchEnable='none';
          this.isMultiSelectSearchEnable='none';
           this.enableMultiSelectItem='none';
            this.enableMultiSelectCategory='none';
            this.enableMultiSelectpurchaseMode='none';
            this.enableMultiSelectpaymentMode='none';
             this.enableMultiSelectMonth='none'
  }

  handleMultiSelect() {
    console.log(this.multiSelect)
     this.searchForm.reset();
    this.multiSelect=!this.multiSelect
    this.searchBudget();
  }
  searchBudget() {
       this.showTable='none';
         this.errorDetails='';
      this.isError='none';
      if(!this.multiSelect) {
         this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='none';
          this.enabletoDate='none';
          this.enableMonth='none';
          this.multiSelectCheck="none";
          this.isSearchEnable='none';
          this.isMultiSelectSearchEnable='none';
           this.enableMultiSelectItem='none';
            this.enableMultiSelectCategory='none';
            this.enableMultiSelectpurchaseMode='none';
            this.enableMultiSelectpaymentMode='none';
             this.enableMultiSelectMonth='none'
    switch(this.searchForm.value.perticularType) {
      case "Month" :{
         this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='none';
          this.enabletoDate='none';
          this.enableMonth='block'
          this.isSearchEnable='block';
           this.isMultiSelectSearchEnable='none';
          break;
      }
       case "Date" :{
         this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='block';
          this.enabletoDate='block';
          this.enableMonth='none'
           this.isSearchEnable='block';
            this.isMultiSelectSearchEnable='none';
         break;
      }
      case "item" :{
         this.enableItem='block';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='block';
          this.enabletoDate='block';
           this.enableMonth='none';
              this.isSearchEnable='block';
               this.isMultiSelectSearchEnable='none';
         break;
      }
      case "category" :{
         this.enableItem='none';
          this.enableCategory='block';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='block';
          this.enabletoDate='block';
           this.enableMonth='none';
              this.isSearchEnable='block';
               this.isMultiSelectSearchEnable='none';
         break;
      }
      case "purchaseMode" :{
         this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='block';
          this.enablepaymentMode='none';
          this.enablefromDate='block';
          this.enabletoDate='block';
           this.enableMonth='none';
              this.isSearchEnable='block';
               this.isMultiSelectSearchEnable='none';
         break;
      }
      case "paymentMode" :{
         this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='block';
          this.enablefromDate='block';
          this.enabletoDate='block';
           this.enableMonth='none';
              this.isSearchEnable='block';
               this.isMultiSelectSearchEnable='none';
         break;
      }
    }
      } else {
        this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='none';
          this.enabletoDate='none';
          this.enableMonth='none';
          this.multiSelectCheck="none";
          this.isSearchEnable='none';
          this.isMultiSelectSearchEnable='none';
          this.isMultiSelectSearchEnable='none';
           this.enableMultiSelectItem='none';
            this.enableMultiSelectCategory='none';
            this.enableMultiSelectpurchaseMode='none';
            this.enableMultiSelectpaymentMode='none';
             this.enableMultiSelectMonth='none'
              switch(this.searchForm.value.perticularType) {
      case "Month" :{
         this.enableMultiSelectItem='none';
          this.enableMultiSelectCategory='none';
          this.enableMultiSelectpurchaseMode='none';
          this.enableMultiSelectpaymentMode='none';
          this.enablefromDate='none';
          this.enabletoDate='none';
          this.enableMultiSelectMonth='block'
          this.isSearchEnable='none';
           this.isMultiSelectSearchEnable='block';
          break;
      }
       case "Date" :{
         this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='block';
          this.enabletoDate='block';
          this.enableMonth='none'
          this.isSearchEnable='none';
           this.isMultiSelectSearchEnable='block';
         break;
      }
      case "item" :{
         this.enableMultiSelectItem='block';
          this.enableMultiSelectCategory='none';
          this.enableMultiSelectpurchaseMode='none';
          this.enableMultiSelectpaymentMode='none';
          this.enablefromDate='block';
          this.enabletoDate='block';
           this.enableMonth='none';
              this.isSearchEnable='none';
           this.isMultiSelectSearchEnable='block';
         break;
      }
      case "category" :{
         this.enableMultiSelectItem='none';
          this.enableMultiSelectCategory='block';
          this.enableMultiSelectpurchaseMode='none';
          this.enableMultiSelectpaymentMode='none';
          this.enablefromDate='block';
          this.enabletoDate='block';
           this.enableMonth='none';
             this.isSearchEnable='none';
           this.isMultiSelectSearchEnable='block';
         break;
      }
      case "purchaseMode" :{
         this.enableMultiSelectItem='none';
          this.enableMultiSelectCategory='none';
          this.enableMultiSelectpurchaseMode='block';
          this.enableMultiSelectpaymentMode='none';
          this.enablefromDate='block';
          this.enabletoDate='block';
           this.enableMultiSelectMonth='none';
              this.isSearchEnable='none';
           this.isMultiSelectSearchEnable='block';
         break;
      }
      case "paymentMode" :{
         this.enableMultiSelectItem='none';
          this.enableMultiSelectCategory='none';
          this.enableMultiSelectpurchaseMode='none';
          this.enableMultiSelectpaymentMode='block';
          this.enablefromDate='block';
          this.enabletoDate='block';
           this.enableMultiSelectMonth='none';
              this.isSearchEnable='none';
           this.isMultiSelectSearchEnable='block';
         break;
      }

      }
  }

}
 submitMultiSearch() {
    this.errorDetails='';
      this.isError='none';
     switch(this.searchForm.value.perticularType) {
      case "Month" :{
        if(this.searchForm.value.selectedMonths=='undefined' || this.searchForm.value.selectedMonths==null) {
          this.isError='block'
          this.errorDetails="Please select atleaest One Month";
          return;
        }
         this.multiSelectRequest.perticularsList=this.searchForm.value.selectedMonths;
        this.multiSelectRequest.perticularType="month";
         this.multiSelectRequest.fromDate="2023-07-01T00:00:00.000Z";
         this.multiSelectRequest.toDate="2023-07-01T00:00:00.000Z";
             this.itemService.searchMultiBudget(this.multiSelectRequest)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
          this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
      case "item" :{
        if(this.searchForm.value.selectedItems=='undefined' || this.searchForm.value.selectedItems==null) {
          this.isError='block'
          this.errorDetails="Please select atleaest One item";
          return;
        }
        if(this.searchForm.value.fromDate=='undefined' || this.searchForm.value.fromDate==null || this.searchForm.value.fromDate=='') {
             console.log('from Date==='+this.searchForm.value.fromDate);
          this.isError='block'
          this.errorDetails="Please select from Date";
            return;
        }
        if(this.searchForm.value.toDate=='undefined' || this.searchForm.value.toDate==null || this.searchForm.value.toDate=='') {
            this.searchForm.value.toDate= this.searchForm.value.fromDate;
        }
        this.multiSelectRequest.perticularsList=this.searchForm.value.selectedItems;
        this.multiSelectRequest.perticularType="item";
         this.multiSelectRequest.fromDate=this.searchForm.value.fromDate;
         this.multiSelectRequest.toDate=this.searchForm.value.toDate;
             this.itemService.searchMultiBudget(this.multiSelectRequest)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
          this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
      case "category" :{
        if(this.searchForm.value.selectedCatogiries=='undefined' || this.searchForm.value.selectedCatogiries==null) {
          this.isError='block'
          this.errorDetails="Please select atleaest One category";
          return;
        }
        if(this.searchForm.value.fromDate=='undefined' || this.searchForm.value.fromDate==null || this.searchForm.value.fromDate=='') {
             console.log('from Date==='+this.searchForm.value.fromDate);
          this.isError='block'
          this.errorDetails="Please select from Date";
            return;
        }
        if(this.searchForm.value.toDate=='undefined' || this.searchForm.value.toDate==null || this.searchForm.value.toDate=='') {
            this.searchForm.value.toDate= this.searchForm.value.fromDate;
        }
        this.multiSelectRequest.perticularsList=this.searchForm.value.selectedCatogiries;
        this.multiSelectRequest.perticularType="Category";
         this.multiSelectRequest.fromDate=this.searchForm.value.fromDate;
         this.multiSelectRequest.toDate=this.searchForm.value.toDate;
             this.itemService.searchMultiBudget(this.multiSelectRequest)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
          this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
      case "purchaseMode" :{
        if(this.searchForm.value.selectedPurchaseModes=='undefined' || this.searchForm.value.selectedPurchaseModes==null) {
          this.isError='block'
          this.errorDetails="Please select atleaest One purchaseMode";
          return;
        }
        if(this.searchForm.value.fromDate=='undefined' || this.searchForm.value.fromDate==null || this.searchForm.value.fromDate=='') {
             console.log('from Date==='+this.searchForm.value.fromDate);
          this.isError='block'
          this.errorDetails="Please select from Date";
            return;
        }
        if(this.searchForm.value.toDate=='undefined' || this.searchForm.value.toDate==null || this.searchForm.value.toDate=='') {
            this.searchForm.value.toDate= this.searchForm.value.fromDate;
        }
        this.multiSelectRequest.perticularsList=this.searchForm.value.selectedPurchaseModes;
        this.multiSelectRequest.perticularType="purchaseMode";
         this.multiSelectRequest.fromDate=this.searchForm.value.fromDate;
         this.multiSelectRequest.toDate=this.searchForm.value.toDate;
             this.itemService.searchMultiBudget(this.multiSelectRequest)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
          this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
      case "paymentMode" :{
        if(this.searchForm.value.selectedPaymentModes=='undefined' || this.searchForm.value.selectedPaymentModes==null) {
          this.isError='block'
          this.errorDetails="Please select atleaest One paymentMode";
          return;
        }
          if(this.searchForm.value.fromDate=='undefined' || this.searchForm.value.fromDate==null || this.searchForm.value.fromDate=='') {
             console.log('from Date==='+this.searchForm.value.fromDate);
          this.isError='block'
          this.errorDetails="Please select from Date";
            return;
        }
        if(this.searchForm.value.toDate=='undefined' || this.searchForm.value.toDate==null || this.searchForm.value.toDate=='') {
            this.searchForm.value.toDate= this.searchForm.value.fromDate;
        }
        this.multiSelectRequest.perticularsList=this.searchForm.value.selectedPaymentModes;
        this.multiSelectRequest.perticularType="paymentMode";
         this.multiSelectRequest.fromDate=this.searchForm.value.fromDate;
         this.multiSelectRequest.toDate=this.searchForm.value.toDate;
             this.itemService.searchMultiBudget(this.multiSelectRequest)
      .subscribe({
        next: (res) => {
          console.log("Search...."+res)
          this.searchResponse = res;
          this.itemsList=res.itemsList;
           this.totalSum=res.totalSum;
          this.itemDataSource = new MatTableDataSource(this.itemsList);
          this.itemDataSource.paginator = this.paginator;
          this.itemDataSource.sort = this.sort;
          this.showTable='block';
        },
        error: (err) => {
          console.log(err);
        }
      })
       this.showTable='block';
      break;
      }
  }
  this.searchForm.reset();
    this.enableItem='none';
          this.enableCategory='none';
          this.enablepurchaseMode='none';
          this.enablepaymentMode='none';
          this.enablefromDate='none';
          this.enabletoDate='none';
          this.enableMonth='none';
          this.isSearchEnable='none';
          this.isMultiSelectSearchEnable='none';
           this.enableMultiSelectItem='none';
            this.enableMultiSelectCategory='none';
            this.enableMultiSelectpurchaseMode='none';
            this.enableMultiSelectpaymentMode='none';
             this.enableMultiSelectMonth='none'
 }

}
