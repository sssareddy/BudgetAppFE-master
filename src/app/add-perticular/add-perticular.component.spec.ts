import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerticularComponent } from './add-perticular.component';

describe('AddPerticularComponent', () => {
  let component: AddPerticularComponent;
  let fixture: ComponentFixture<AddPerticularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPerticularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPerticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
