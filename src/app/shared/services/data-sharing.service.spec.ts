import { TestBed } from '@angular/core/testing';

import { DataSharingService } from './data-sharing.service';

describe('DataSharingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSharingService = TestBed.inject(DataSharingService);
    expect(service).toBeTruthy();
  });
});
