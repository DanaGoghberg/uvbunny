import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunniesComponent } from './bunnies.component';

describe('BunniesComponent', () => {
  let component: BunniesComponent;
  let fixture: ComponentFixture<BunniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BunniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BunniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
