import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytripPage } from './mytrip.page';

describe('MytripPage', () => {
  let component: MytripPage;
  let fixture: ComponentFixture<MytripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytripPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
