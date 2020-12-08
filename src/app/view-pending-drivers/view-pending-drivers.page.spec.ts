import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewPendingDriversPage } from './view-pending-drivers.page';

describe('ViewPendingDriversPage', () => {
  let component: ViewPendingDriversPage;
  let fixture: ComponentFixture<ViewPendingDriversPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPendingDriversPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPendingDriversPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
