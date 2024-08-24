import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThankyouPage } from './thankyou.page';

describe('ThankyouPage', () => {
  let component: ThankyouPage;
  let fixture: ComponentFixture<ThankyouPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankyouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
