import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResetpwPage } from './resetpw.page';

describe('ResetpwPage', () => {
  let component: ResetpwPage;
  let fixture: ComponentFixture<ResetpwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResetpwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
