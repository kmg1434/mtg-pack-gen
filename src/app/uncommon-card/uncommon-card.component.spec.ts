import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UncommonCardComponent } from './uncommon-card.component';

describe('UncommonCardComponent', () => {
  let component: UncommonCardComponent;
  let fixture: ComponentFixture<UncommonCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UncommonCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UncommonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
