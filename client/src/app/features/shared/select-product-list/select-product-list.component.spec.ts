import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductListComponent } from './select-product-list.component';

describe('UserProductListComponent', () => {
  let component: SelectProductListComponent;
  let fixture: ComponentFixture<SelectProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProductListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
