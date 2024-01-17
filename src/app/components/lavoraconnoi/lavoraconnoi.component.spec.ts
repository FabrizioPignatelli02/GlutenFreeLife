import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavoraconnoiComponent } from './lavoraconnoi.component';

describe('LavoraconnoiComponent', () => {
  let component: LavoraconnoiComponent;
  let fixture: ComponentFixture<LavoraconnoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LavoraconnoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LavoraconnoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
