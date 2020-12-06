import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditofferPage } from './editoffer.page';

describe('EditofferPage', () => {
  let component: EditofferPage;
  let fixture: ComponentFixture<EditofferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditofferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditofferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
