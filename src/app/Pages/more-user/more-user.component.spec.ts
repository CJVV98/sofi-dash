import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreUserComponent } from './more-user.component';

describe('MoreUserComponent', () => {
  let component: MoreUserComponent;
  let fixture: ComponentFixture<MoreUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
