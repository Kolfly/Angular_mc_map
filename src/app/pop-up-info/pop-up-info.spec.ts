import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpInfo } from './pop-up-info';

describe('PopUpInfo', () => {
  let component: PopUpInfo;
  let fixture: ComponentFixture<PopUpInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
