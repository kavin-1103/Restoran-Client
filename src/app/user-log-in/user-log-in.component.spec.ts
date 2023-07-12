import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogInComponent } from './user-log-in.component';

describe('UserLogInComponent', () => {
  let component: UserLogInComponent;
  let fixture: ComponentFixture<UserLogInComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLogInComponent]
    });
    fixture = TestBed.createComponent(UserLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
