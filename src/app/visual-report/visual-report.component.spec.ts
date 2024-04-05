import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualReportComponent } from './visual-report.component';

describe('VisualReportComponent', () => {
  let component: VisualReportComponent;
  let fixture: ComponentFixture<VisualReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
