import { HttpClient,HttpEvent  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { ItemResponse } from '../models/ItemResponse';
import { PerticularResponse } from '../models/PerticularResponse';
import { GenericResponse } from '../models/GenericResponse';
import { Observable } from 'rxjs';
import { ReportResponse } from '../models/ReportResponse';
import { MultiSelectRequest } from '../models/MultiSelectRequest';
import { Perticular } from '../models/Perticular';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private baseUrl: string = "http://localhost:9000/budget/"
  private searchUrl: string = "http://localhost:9000/searchBudget/"
  private uploadUrl:string="http://localhost:9000/bulkUpload/"
  private chartsUrl:string="http://localhost:9000/charts/"
  constructor(private http: HttpClient) { }

  addItem(itemObj: Item) {
    itemObj.purchaseDate=this.convertDate( itemObj.purchaseDate)
    return this.http.post<ItemResponse>(`${this.baseUrl}`+'addItem', itemObj)
  }

  getItemsCurrentMonth():Observable<ItemResponse> {
    return this.http.get<ItemResponse>(`${this.baseUrl}`+'getItemsByMonth?month=currentMonth')
  }
  getItemsCurrentDate():Observable<ItemResponse> {
    return this.http.get<ItemResponse>(`${this.baseUrl}`+'getItemsByMonth?month=today')
  }
  getItemsList():Observable<string[]> {
     return this.http.get<string[]>(`${this.baseUrl}`+'item');
  }
  getPerticularsList(type:string):Observable<PerticularResponse> {
     return this.http.get<PerticularResponse>(`${this.baseUrl}`+type);
  }

    getCategoryForItem(Item:string):Observable<GenericResponse> {
     return this.http.get<GenericResponse>(`${this.baseUrl}`+'getCategory/'+Item);
  }

  searchBudgetByMonth(year:number,month:string):Observable<ItemResponse> {
    return this.http.get<ItemResponse>(`${this.searchUrl}`+'searchByMonth'+'/'+year+'/'+month)
  }

   searchBudget(perticularType:string,perticularValue:string,from:string,to:string):Observable<ItemResponse> {
    return this.http.get<ItemResponse>(`${this.searchUrl}`+'searchByMonth'+'/'+perticularType+'/'+perticularValue+'/'+this.convertDate(from)+'/'+this.convertDate(to))
   }
   searchMultiBudget(multiSelectRequest:MultiSelectRequest):Observable<ItemResponse> {
        multiSelectRequest.fromDate=this.convertDate( multiSelectRequest.fromDate)
        multiSelectRequest.toDate=this.convertDate( multiSelectRequest.toDate)
    return this.http.post<ItemResponse>(`${this.searchUrl}`+'getBudgetByMonthMultiSelect',multiSelectRequest)
   }

   deleteBudget(id:number,itemList:Item[]):Observable<ItemResponse> {
    return this.http.post<ItemResponse>(`${this.baseUrl}`+'deleteById'+'/'+id,itemList);
  }

  savePerticular(perticular:Perticular):Observable<PerticularResponse> {
    return this.http.post<PerticularResponse>(`${this.baseUrl}`+'savePerticular',perticular);
  }

  getPerticularsForMgmt(type:string):Observable<PerticularResponse> {
     return this.http.get<PerticularResponse>(`${this.baseUrl}`+'perticularsMgmt/'+type);
  }
   deletePerticular(id:number):Observable<PerticularResponse> {
    return this.http.post<PerticularResponse>(`${this.baseUrl}`+'deletePerticular/'+id,{});
  }

  getMonthlyReport(month:string):Observable<any>  {
   return this.http.get<any>(`${this.searchUrl}`+'getSummaryByMonth/'+month);
  }

  getReportMultiMonth(months:string[]):Observable<any>  {
   return this.http.post<any>(`${this.searchUrl}`+'getSummaryForMultiMonth',months);
  }

  getChartOptions():Observable<any>  {
   return this.http.get<any>(`${this.chartsUrl}`+'getItemChartMonth/January');
  }

  uploadBudgetFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ItemResponse>(`${this.uploadUrl}`+'bulkUploadItems', formData);
  }

  uploadPerticulars(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ItemResponse>(`${this.uploadUrl}`+'uploadPerticulars', formData);
  }

  
  exportBudget():Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.uploadUrl}`+'exportBudget',{});
  }

   getBudgetChartMonth(perticularType:string,month:string,chartType:string):Observable<any>  {
   return this.http.get<any>(`${this.chartsUrl}`+'getBudgetChartMonth/'+perticularType+'/'+month+'/'+chartType);
  }

   getBudgetChartByYear(perticularType:string,year:string,chartType:string):Observable<any>  {
   return this.http.get<any>(`${this.chartsUrl}`+'getBudgetChartByYear/'+perticularType+'/'+year+'/'+chartType);
  }

   getTotalBudgetByMonth(year:string,chartType:string):Observable<any>  {
   return this.http.get<any>(`${this.chartsUrl}`+'getTotalBudgetByMonth/'+year+'/'+chartType);
  }
  getTotalBudgetByYear(chartType:string):Observable<any>  {
   return this.http.get<any>(`${this.chartsUrl}`+'getTotalBudgetByYear/'+chartType);
  }
  getMonthlyBudgetChart(year:string,chartType:string):Observable<any>  {
   return this.http.get<any>(`${this.chartsUrl}`+'getTotalBudgetByMonth/'+year+'/'+chartType);
  }
  getYearlyBudgetChart(chartType:string):Observable<any>  {
   return this.http.get<any>(`${this.chartsUrl}`+'getTotalBudgetByYear'+'/'+chartType);
  }


  convertDate(selectedDate:string):string{
    let convertedDate:Date;
    convertedDate=new Date(selectedDate);
    selectedDate=new Date(convertedDate.getFullYear(),convertedDate.getMonth(),
    convertedDate.getDate(), convertedDate.getHours(), convertedDate.getMinutes() -convertedDate.getTimezoneOffset()).toISOString();
    return selectedDate;
  }

}

