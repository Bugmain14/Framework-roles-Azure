import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRolAssigmentComponent } from './delete-rol-assigment.component';

describe('DeleteRolAssigmentComponent', () => {
  let component: DeleteRolAssigmentComponent;
  let fixture: ComponentFixture<DeleteRolAssigmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteRolAssigmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRolAssigmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
