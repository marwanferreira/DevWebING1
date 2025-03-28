import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionObjetsComponent } from './gestion-objets.component';

describe('GestionObjetsComponent', () => {
  let component: GestionObjetsComponent;
  let fixture: ComponentFixture<GestionObjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionObjetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionObjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
