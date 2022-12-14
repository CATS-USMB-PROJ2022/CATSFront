import { TestBed } from '@angular/core/testing';

import { CallService } from './call.service';
import {HttpClient} from "@angular/common/http";

describe('CallService', () => {
  let service: CallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: HttpClient, useValue: {} }],
    });
    service = TestBed.inject(CallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
