import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunnyStatusComponent } from './bunny-status.component';

describe('BunnyStatusComponent', () => {
  let component: BunnyStatusComponent;
  let fixture: ComponentFixture<BunnyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BunnyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BunnyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
