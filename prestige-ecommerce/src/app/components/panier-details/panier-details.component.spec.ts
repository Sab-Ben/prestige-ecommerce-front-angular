import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierDetailsComponent } from './panier-details.component';

describe('PanierDetailsComponent', () => {
  let component: PanierDetailsComponent;
  let fixture: ComponentFixture<PanierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
