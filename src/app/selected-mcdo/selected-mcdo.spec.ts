import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMcdo } from './selected-mcdo';

describe('SelectedMcdo', () => {
  let component: SelectedMcdo;
  let fixture: ComponentFixture<SelectedMcdo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedMcdo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedMcdo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
