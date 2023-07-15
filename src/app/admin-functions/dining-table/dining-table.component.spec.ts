import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTableComponent } from './dining-table.component';

describe('DiningTableComponent', () => {
  let component: DiningTableComponent;
  let fixture: ComponentFixture<DiningTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiningTableComponent]
    });
    fixture = TestBed.createComponent(DiningTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
