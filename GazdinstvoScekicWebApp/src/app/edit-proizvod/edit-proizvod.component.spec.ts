import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProizvodComponent } from './edit-proizvod.component';

describe('EditProizvodComponent', () => {
  let component: EditProizvodComponent;
  let fixture: ComponentFixture<EditProizvodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProizvodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProizvodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
