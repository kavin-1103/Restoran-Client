import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFunctionsComponent } from './admin-functions.component';

describe('AdminFunctionsComponent', () => {
  let component: AdminFunctionsComponent;
  let fixture: ComponentFixture<AdminFunctionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminFunctionsComponent]
    });
    fixture = TestBed.createComponent(AdminFunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
