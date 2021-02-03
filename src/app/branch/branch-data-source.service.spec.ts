import { TestBed } from '@angular/core/testing';

import { BranchDataSourceService } from './branch-data-source.service';

describe('BranchDataSourceService', () => {
  let service: BranchDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
