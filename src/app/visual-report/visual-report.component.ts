import { Component,OnInit } from '@angular/core';
import { ChartType, ChartOptions,Chart } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { ItemService } from '../service/ItemService';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'chart.js';

@Component({
  selector: 'app-visual-report',
  templateUrl: './visual-report.component.html',
  styleUrls: ['./visual-report.component.scss']
})
export class VisualReportComponent implements OnInit{

constructor(private itemService:ItemService,private fb: FormBuilder) {

}
  public barChartOptions:any;
  public chart: any;
  showChart:string;
  perticularTypes:string[]=['Yearly','Monthly','item','category','purchaseMode','paymentMode'];
  monthsList:string[]=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  showMonths:string;
   yearsList:string[]=['2025','2024','2023'];
    showYears:string;
   chartForm!: FormGroup;
   showMonthYear:string
   chartType:string
   flex:string='flex'
 // public barChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','January2', 'February2', 'March2', 'April2', 'May2', 'June2', 'July2','August2'];
  //public barChartType:ChartType  = 'bar';
 // public barChartLegend = true;
 // public barChartData = [
    //{ data: [1650, 1590, 1800, 1810, 1560, 155, 140,112,1650, 1590, 1800, 1810, 156, 155, 140,112], label: 'Series A' }
 // ];

 getChartOptions() {
   if(this.chartForm.value.perticularType=='Monthly')  {
     if(this.chart) {
         this.chart.destroy();
       }
      this.showMonths='none';
      this.showMonthYear='none';
       this.showYears='block';
        this.showMonths='none';
         this.showChart='block';
      this.itemService.getMonthlyBudgetChart(this.chartForm.value.year,this.chartForm.value.chartType)
      .subscribe(res => {
        console.log(res);
      this.chart=new Chart('myChart',res.chartJson);
      });
      return;
   }
   if(this.chartForm.value.perticularType=='Yearly')  {
     if(this.chart) {
         this.chart.destroy();
       }
      this.showMonths='none';
      this.showMonthYear='none';
       this.showYears='none';
        this.showMonths='none';
         this.showChart='block';
      this.itemService.getYearlyBudgetChart(this.chartForm.value.chartType)
      .subscribe(res => {
        console.log(res);
      this.chart=new Chart('myChart',res.chartJson);
      });
      return;
   }
     this.showMonthYear='block';
     if(this.chartForm.value.frequency=='Month') {
         this.showMonthYear='block';
       if(this.chart) {
         this.chart.destroy();
       }
         this.showChart='block';
         this.showMonths='block'
         this.showMonthYear='block';
       this.itemService.getBudgetChartMonth(this.chartForm.value.perticularType,this.chartForm.value.month,this.chartForm.value.chartType)
      .subscribe(res => {
        console.log(res);
      this.chart=new Chart('myChart',res.chartJson);
      });
     }
      if(this.chartForm.value.frequency=='Year') {
     if(this.chart) {
         this.chart.destroy();
       }
         this.showChart='block';
         this.showYears='block';
         this.showMonthYear='block';
       this.itemService.getBudgetChartByYear(this.chartForm.value.perticularType,this.chartForm.value.year,this.chartForm.value.chartType)
      .subscribe(res => {
        console.log(res);
      this.chart=new Chart('myChart',res.chartJson);
      });
     }
 }
 onPerticularChange() {
   console.log("On change")
   if(this.chartForm.value.perticularType=='Monthly')  {
     if(this.chart) {
         this.chart.destroy();
       }
      this.showMonths='none';
      this.showMonthYear='none';
       this.showYears='block';
        this.showMonths='none';
      return;
   }
   if(this.chartForm.value.perticularType=='Yearly')  {
     if(this.chart) {
         this.chart.destroy();
       }
      this.showMonths='none';
      this.showMonthYear='none';
       this.showYears='none';
        this.showMonths='none';
      return;
   }
     this.showMonthYear='block';
   if(this.chartForm.value.frequency=='Month') {
      this.showMonths='block';
      this.showYears='none';
   } else if(this.chartForm.value.frequency=='Year') {
     this.showMonths='none';
      this.showYears='block';
   }
 }

   ngOnInit() {
   // this.itemService.getChartOptions()
      //.subscribe(res => {
       // console.log(res);
     // this.chart=new Chart('myChart',res.chartJson);
     // });
     // this.chart=new Chart('myChart', this.barChartOptions);
     this.showChart='none';
     this.showMonths='none'
     this.showYears='none'
     this.showMonthYear='block';
     this.chartType='bar'
     this.chartForm = this.fb.group({
      perticularType:[''],
     frequency: '',
     month:'',
     year:'',
     chartType:''
    });
   }
}
