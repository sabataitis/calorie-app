import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthHeaderComponent } from './non-auth-header.component';

describe('NonAuthHeaderComponent', () => {
  let component: NonAuthHeaderComponent;
  let fixture: ComponentFixture<NonAuthHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAuthHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
