import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageuploaderPage } from './imageuploader.page';

describe('ImageuploaderPage', () => {
  let component: ImageuploaderPage;
  let fixture: ComponentFixture<ImageuploaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageuploaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageuploaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
