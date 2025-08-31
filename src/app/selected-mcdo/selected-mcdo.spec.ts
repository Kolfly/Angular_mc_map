import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMcdoComponent } from './selected-mcdo';

describe('SelectedMcdo', () => {
  let component: SelectedMcdoComponent;
  let fixture: ComponentFixture<SelectedMcdoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedMcdoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedMcdoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
