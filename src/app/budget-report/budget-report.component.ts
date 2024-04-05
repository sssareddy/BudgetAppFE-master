import { Component,OnInit } from '@angular/core';
import { ItemService } from '../service/ItemService';
import { ReportResponse } from '../models/ReportResponse';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-budget-report',
  templateUrl: './budget-report.component.html',
  styleUrls: ['./budget-report.component.scss']
})
export class BudgetReportComponent implements OnInit {



ngOnInit(): void {
   this.showReport='none';
  this.searchForm = this.fb.group({
      selectedMonths:[]
     
    });
}

  reportResponse:any;
  monthList:string[]=['January','February','March','April','May','June','July','August','September','October','November','December'];
  selectedMonths:string[];
  showReport:string;
  searchForm!: FormGroup;
  constructor(private fb: FormBuilder,private itemService:ItemService) { }

  getReportByMonth(month:string) {
   this.itemService.getMonthlyReport('December')
      .subscribe(res => {
       this.reportResponse=  res;
      });
}

getReportMultiMonth() {
   this.showReport='block';
   this.itemService.getReportMultiMonth(this.searchForm.value.selectedMonths)
      .subscribe(res => {
       this.reportResponse=  res;
      });
}

}
