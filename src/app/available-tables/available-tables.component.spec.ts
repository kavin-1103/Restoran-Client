import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTablesComponent } from './available-tables.component';

describe('AvailableTablesComponent', () => {
  let component: AvailableTablesComponent;
  let fixture: ComponentFixture<AvailableTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableTablesComponent]
    });
    fixture = TestBed.createComponent(AvailableTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


