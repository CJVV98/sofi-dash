import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreRolComponent } from './more-rol.component';

describe('MoreRolComponent', () => {
  let component: MoreRolComponent;
  let fixture: ComponentFixture<MoreRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
