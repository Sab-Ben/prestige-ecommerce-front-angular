import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierStatutsComponent } from './panier-statuts.component';

describe('PanierStatutsComponent', () => {
  let component: PanierStatutsComponent;
  let fixture: ComponentFixture<PanierStatutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanierStatutsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierStatutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
