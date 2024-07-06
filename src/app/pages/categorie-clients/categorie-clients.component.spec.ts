import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieClientsComponent } from './categorie-clients.component';

describe('CategorieClientFormComponent', () => {
  let component: CategorieClientsComponent;
  let fixture: ComponentFixture<CategorieClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
