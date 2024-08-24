import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashscreenPage } from './splashscreen.page';

describe('SplashscreenPage', () => {
  let component: SplashscreenPage;
  let fixture: ComponentFixture<SplashscreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
