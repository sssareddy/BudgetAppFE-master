import { Component,Input,OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'GymRegistrationCrud';
  searchLink:string='link';
  homeLink:string='active';
  reportLink:string='link';
  uploadLink:string='link';
  mgmtLink:string='link';
  chartLink:string='link';
   @Input() receivedLink: string;
    ngOnInit(): void {
      if(this.receivedLink=='home') {
         this.homeLink='active';
      }
    }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  activateLink(page:string) {
    if(page=='search') {
      this.searchLink="active";
       this.homeLink='link';
       this.reportLink='link';
       this.uploadLink='link';
       this.mgmtLink='link';
       this.chartLink='link';
    }
    if(page=='home') {
      this.searchLink="link";
      this.homeLink='active';
      this.reportLink='link';
       this.uploadLink='link';
       this.mgmtLink='link';
    }
    if(page=='report') {
      this.searchLink="link";
      this.homeLink='link';
      this.reportLink='active';
       this.uploadLink='link';
       this.mgmtLink='link';
       this.chartLink='link';
    }
    if(page=='upload') {
      this.searchLink="link";
      this.homeLink='link';
      this.reportLink='link';
       this.uploadLink='active';
       this.mgmtLink='link';
       this.chartLink='link';
    }
     if(page=='mgmt') {
      this.searchLink="link";
      this.homeLink='link';
      this.reportLink='link';
       this.uploadLink='link';
       this.mgmtLink='active';
       this.chartLink='link';
    }
    if(page=='chart') {
      this.searchLink="link";
      this.homeLink='link';
      this.reportLink='link';
       this.uploadLink='link';
       this.mgmtLink='link';
       this.chartLink='active';
    }
  }
  isSelected(link: string){
    this.homeLink='link';
  }
}

