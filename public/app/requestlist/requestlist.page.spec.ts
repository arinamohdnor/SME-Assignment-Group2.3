import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestlistPage } from './requestlist.page';

describe('RequestlistPage', () => {
  let component: RequestlistPage;
  let fixture: ComponentFixture<RequestlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
