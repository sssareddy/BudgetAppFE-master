import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadComponentComponent } from './bulk-upload-component.component';

describe('BulkUploadComponentComponent', () => {
  let component: BulkUploadComponentComponent;
  let fixture: ComponentFixture<BulkUploadComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUploadComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUploadComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
