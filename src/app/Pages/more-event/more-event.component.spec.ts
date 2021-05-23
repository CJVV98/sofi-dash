import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreEventComponent } from './more-event.component';

describe('MoreEventComponent', () => {
  let component: MoreEventComponent;
  let fixture: ComponentFixture<MoreEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
