import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerticularManagementComponent } from './perticular-management.component';

describe('PerticularManagementComponent', () => {
  let component: PerticularManagementComponent;
  let fixture: ComponentFixture<PerticularManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerticularManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerticularManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
