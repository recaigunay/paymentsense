import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryContainerComponent } from './country-container.component';

describe('CountryContainerComponent', () => {
  let component: CountryContainerComponent;
  let fixture: ComponentFixture<CountryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
