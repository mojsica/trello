import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardFormComponent } from './new-board-form.component';

describe('NewBoardFormComponent', () => {
  let component: NewBoardFormComponent;
  let fixture: ComponentFixture<NewBoardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBoardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
