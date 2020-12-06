import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindtripPage } from './findtrip.page';

describe('FindtripPage', () => {
  let component: FindtripPage;
  let fixture: ComponentFixture<FindtripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindtripPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindtripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
