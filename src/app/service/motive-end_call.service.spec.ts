import { TestBed } from '@angular/core/testing';

import {MotiveEndCallService} from './motive-end_call.service';

describe('MotiveEndCallService', () => {
  let service: MotiveEndCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotiveEndCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
