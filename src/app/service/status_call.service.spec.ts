import { TestBed } from '@angular/core/testing';

import { StatusCallService } from './status_call.service';

describe('StatusCallService', () => {
  let service: StatusCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
