import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableDiningsComponent } from './available-dinings.component';

describe('AvailableDiningsComponent', () => {
  let component: AvailableDiningsComponent;
  let fixture: ComponentFixture<AvailableDiningsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableDiningsComponent]
    });
    fixture = TestBed.createComponent(AvailableDiningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
