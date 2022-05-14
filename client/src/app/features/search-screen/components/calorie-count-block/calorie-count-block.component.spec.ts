import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalorieCountBlockComponent } from './calorie-count-block.component';

describe('InfoBlockComponent', () => {
  let component: CalorieCountBlockComponent;
  let fixture: ComponentFixture<CalorieCountBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalorieCountBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalorieCountBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
