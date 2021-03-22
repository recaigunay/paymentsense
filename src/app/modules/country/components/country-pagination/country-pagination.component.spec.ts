import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPaginationComponent } from './country-pagination.component';

describe('CountryPaginationComponent', () => {
  let component: CountryPaginationComponent;
  let fixture: ComponentFixture<CountryPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
