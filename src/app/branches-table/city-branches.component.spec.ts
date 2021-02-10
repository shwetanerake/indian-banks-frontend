import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBranchesComponent } from './city-branches.component';

describe('CityBranchesComponent', () => {
  let component: CityBranchesComponent;
  let fixture: ComponentFixture<CityBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityBranchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
