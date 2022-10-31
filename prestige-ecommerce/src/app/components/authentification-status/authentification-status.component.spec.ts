import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentificationStatusComponent } from './authentification-status.component';

describe('AuthentificationStatusComponent', () => {
  let component: AuthentificationStatusComponent;
  let fixture: ComponentFixture<AuthentificationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthentificationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthentificationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
