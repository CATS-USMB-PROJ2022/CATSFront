import { TestBed } from '@angular/core/testing';

import {MotiveEndCallService} from './motive-end_call.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('MotiveEndCallService', () => {
  let service: MotiveEndCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            HttpClient,
            {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
            HttpHandler,
            {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        ],
    });
    service = TestBed.inject(MotiveEndCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
