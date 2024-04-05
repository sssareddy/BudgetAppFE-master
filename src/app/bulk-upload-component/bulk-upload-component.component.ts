import { Component,OnInit } from '@angular/core';
import { ItemService } from '../service/ItemService';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-bulk-upload-component',
  templateUrl: './bulk-upload-component.component.html',
  styleUrls: ['./bulk-upload-component.component.scss']
})
export class BulkUploadComponentComponent implements OnInit{
  selectedFile: File;
  showSpinner:string='none';
  uploadFailed:string='none';
  showStatus:string='none';
  uploadStatus:string;
  uploadFlag:boolean;
  fileCheck:string='none';
  constructor(private toastService: NgToastService,private itemService:ItemService) {}


  uploadFile() {
     this.fileCheck='none';
    if(this.selectedFile==undefined || this.selectedFile==null) {
      this.fileCheck='block';
      return;
    } else {
      this.fileCheck='none';
    }
    this.showSpinner='block';
      this.uploadFlag=false;
         this.fileCheck='none';
  this.itemService.uploadBudgetFile(this.selectedFile).subscribe({
        next: (res) => {
         this.showSpinner='none';
         this.uploadStatus=res.message;
         this.showStatus='block';
            this.uploadFlag=true;
        },
        error: (err) => {
            this.showSpinner='none';
          this.uploadFailed='block';
          console.log(err);
        }
      })
  }

  


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

   uploadPerticulars() {
      this.fileCheck='none';
     if(this.selectedFile==undefined || this.selectedFile==null) {
      this.fileCheck='block';
      return;
    } else {
      this.fileCheck='none';
    }
    this.showSpinner='block';
    this.uploadFlag=false;
     this.fileCheck='none';
  this.itemService.uploadPerticulars(this.selectedFile).subscribe({
        next: (res) => {
         this.showSpinner='none';
         this.uploadStatus=res.message;
         this.showStatus='block';
         this.uploadFlag=true;
        },
        error: (err) => {
           this.showSpinner='none';
          this.uploadFailed='block';
          console.log(err);
        }
      });
  }

  exportBudget() {
     this.fileCheck='none';
    this.showSpinner='none';
  this.itemService.exportBudget().subscribe({
        next: (res) => {
         this.showSpinner='none';
         console.log(res);
         this.uploadStatus=res.message;
         this.showStatus='block';
        },
        error: (err) => {
          this.uploadStatus="Export Failed...."
          console.log(err);
        }
      })
  }

  ngOnInit() {
     this.showSpinner='none';
     this.uploadStatus='';
     this.showStatus='none';
      this.uploadFailed='none';
      this.uploadFlag=true;
      this.fileCheck='none';
   }

}
