import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { NgConfirmModule } from 'ng-confirm-box';

import { RegistrationListComponent } from './registration-list/registration-list.component';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AddPerticularComponent } from './add-perticular/add-perticular.component';
import { MatDialogModule,MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { MAT_DATE_FORMATS, MatDateFormats,MAT_DATE_LOCALE } from '@angular/material/core';
import { BudgetReportComponent } from './budget-report/budget-report.component';
import { BulkUploadComponentComponent } from './bulk-upload-component/bulk-upload-component.component';
import { PerticularManagementComponent } from './perticular-management/perticular-management.component';
import { VisualReportComponent } from './visual-report/visual-report.component';
import { ChartsModule  } from 'ng2-charts';

const  MY_DATE_FORMATS: MatDateFormats = {
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


@NgModule({
  declarations: [
    AppComponent,
    RegistrationListComponent,
    CreateRegistrationComponent,
    UserDetailComponent,
    AddPerticularComponent,
    BudgetReportComponent,
    BulkUploadComponentComponent,
    PerticularManagementComponent,
    VisualReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatChipsModule,
    ChartsModule ,

    NgToastModule,
    NgConfirmModule
  ],
providers: [
     { provide: MAT_DIALOG_DATA, useValue: {} },
     { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DATE_FORMATS, useValue: { parse: { dateInput: 'MM/DD/YYYY' }, display: { dateInput: 'MM/DD/YYYY' } }},
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
