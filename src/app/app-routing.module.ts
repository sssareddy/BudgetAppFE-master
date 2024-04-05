import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { BudgetReportComponent } from './budget-report/budget-report.component';
import { BulkUploadComponentComponent } from './bulk-upload-component/bulk-upload-component.component';
import { PerticularManagementComponent } from './perticular-management/perticular-management.component';
import { VisualReportComponent } from './visual-report/visual-report.component';
import { Item } from './models/Item';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'register' },
  { path: 'register', component: CreateRegistrationComponent },
  { path: 'update/:id', component: CreateRegistrationComponent },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'list', component: RegistrationListComponent },
  { path: 'home', component: CreateRegistrationComponent },
  { path: 'report', component: BudgetReportComponent },
  { path: 'bulkUpload', component: BulkUploadComponentComponent },
   { path: 'perticularMgmt', component: PerticularManagementComponent },
    { path: 'visualReports', component: VisualReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
