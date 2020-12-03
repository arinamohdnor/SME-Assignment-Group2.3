import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyrequestPage } from './myrequest.page';

describe('MyrequestPage', () => {
  let component: MyrequestPage;
  let fixture: ComponentFixture<MyrequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyrequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyrequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
