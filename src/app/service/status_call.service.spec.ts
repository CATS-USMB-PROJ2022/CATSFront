import { TestBed } from '@angular/core/testing';
import { StatusCallService } from './status_call.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('StatusCallService', () => {
  let service: StatusCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            HttpClient,
            {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
            HttpHandler,
            {provide: 'globalUrl', useValue: 'http://localhost:8080/'},
        ],
    });
    service = TestBed.inject(StatusCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
