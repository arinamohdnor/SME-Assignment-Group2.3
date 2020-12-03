import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesPage } from './rides.page';

describe('RidesPage', () => {
  let component: RidesPage;
  let fixture: ComponentFixture<RidesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
