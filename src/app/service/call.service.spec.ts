import { TestBed } from '@angular/core/testing';

import { CallService } from './call.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";

describe('CallService', () => {
  let service: CallService;
  let httpMock: HttpTestingController;
  let cookieServiceSpy: CookieService;
  let caisse: number;
  let start: Date;
  let end: Date;
  let start_time_hours: number;
  let start_time_minutes: number;
  let end_time_hours: number;
  let end_time_minutes: number;
  let gt: string[];
  let agences: string[];
  let threshold: number;
  let hno: number;


  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['get', 'set']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CallService,
        {provide: CookieService, useValue: spy},
          HttpClient,
          {provide: 'globalUrl', useValue: 'http://localhost:8080/'},

      ],
    });
    service = TestBed.inject(CallService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;

    // Set default values for cookies
    caisse = 881;
    start = new Date();
    end = new Date();
    start_time_hours = 8;
    start_time_minutes = 0;
    end_time_hours = 23;
    end_time_minutes = 0;
    gt = [];
    agences = [];
    threshold = 10;
    hno = 0;
    // Set cookies to default values
    cookieServiceSpy.set('caisse', caisse.toString());
    cookieServiceSpy.set('start_date', start.toString());
    cookieServiceSpy.set('end_date', end.toString());
    cookieServiceSpy.set('start_time_hours', start_time_hours.toString());
    cookieServiceSpy.set('start_time_minutes', start_time_minutes.toString());
    cookieServiceSpy.set('end_time_hours', end_time_hours.toString());
    cookieServiceSpy.set('end_time_minutes', end_time_minutes.toString());
    cookieServiceSpy.set('gt', gt.toString());
    cookieServiceSpy.set('agences', agences.toString());
    cookieServiceSpy.set('threshold', threshold.toString());
    cookieServiceSpy.set('hno', hno.toString());
    console.log(cookieServiceSpy.get('caisse'));
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
