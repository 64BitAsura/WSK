import { TestBed } from '@angular/core/testing';

import { AngularLibraryService } from './angular-library.service';

describe('AngularLibraryService', () => {
  let service: AngularLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
