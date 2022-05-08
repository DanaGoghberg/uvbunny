import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BunnyDialogComponent } from './bunny-dialog.component';

describe('BunnyDialogComponent', () => {
  let component: BunnyDialogComponent;
  let fixture: ComponentFixture<BunnyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BunnyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BunnyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
