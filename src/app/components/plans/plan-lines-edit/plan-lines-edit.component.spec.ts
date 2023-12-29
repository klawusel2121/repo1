import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanLinesEditComponent } from './plan-lines-edit.component';

describe('PlanLinesEditComponent', () => {
  let component: PlanLinesEditComponent;
  let fixture: ComponentFixture<PlanLinesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanLinesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanLinesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
