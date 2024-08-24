import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillPage } from './bill.page';

describe('BillPage', () => {
  let component: BillPage;
  let fixture: ComponentFixture<BillPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
