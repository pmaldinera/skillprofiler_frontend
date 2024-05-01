import { TestBed } from '@angular/core/testing';

import { AcademicdegreeService } from './academicdegree.service';

describe('AcademicdegreeService', () => {
  let service: AcademicdegreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicdegreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
