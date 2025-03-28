import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsNiveauxComponent } from './points-niveaux.component';

describe('PointsNiveauxComponent', () => {
  let component: PointsNiveauxComponent;
  let fixture: ComponentFixture<PointsNiveauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsNiveauxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointsNiveauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
