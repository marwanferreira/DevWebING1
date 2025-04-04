import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionObjetsComponent } from './gestion-objets.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('GestionObjetsComponent', () => {
  let component: GestionObjetsComponent;
  let fixture: ComponentFixture<GestionObjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GestionObjetsComponent,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        FormsModule
      ]
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
