import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RareCardComponent } from './rare-card.component';

describe('RareCardComponent', () => {
  let component: RareCardComponent;
  let fixture: ComponentFixture<RareCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RareCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
