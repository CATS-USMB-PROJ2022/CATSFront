import { TestBed } from '@angular/core/testing';

import { CallService } from './call.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {CookieService} from "ngx-cookie-service";

describe('CallService', () => {
  let service: CallService;
  let httpMock: HttpTestingController;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CallService,
        {provide: CookieService, useValue: spy}
      ],
    });
    service = TestBed.inject(CallService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reurn the correct Caisse ID', () => {
    cookieServiceSpy.get.withArgs('rub_id_caisse').and.returnValue('881');
    expect(service.getCookieCaisse()).toEqual(881);
  });

  it('should postNumberCall with the correct parameters', () => {
      cookieServiceSpy.get.withArgs('rub_id_caisse').and.returnValue('881');
      cookieServiceSpy.get.withArgs('start_date').and.returnValue(new Date().toString());
      cookieServiceSpy.get.withArgs('end_date').and.returnValue(new Date().toString());
      cookieServiceSpy.get.withArgs('start_time_hours').and.returnValue('8');
      cookieServiceSpy.get.withArgs('start_time_minutes').and.returnValue('0');
      cookieServiceSpy.get.withArgs('end_time_hours').and.returnValue('22');
      cookieServiceSpy.get.withArgs('end_time_minutes').and.returnValue('00');
      cookieServiceSpy.get.withArgs('gt').and.returnValue(JSON.stringify({}));
      cookieServiceSpy.get.withArgs('agences').and.returnValue(JSON.stringify([]));
      cookieServiceSpy.get.withArgs('threshold').and.returnValue('10');
      cookieServiceSpy.get.withArgs('hno').and.returnValue('-1');

      service.postNumberCall().subscribe();

      const req = httpMock.expectOne(`http://localhost:8080/Home`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        RUB_ID_CAISSE: 881,
        START_DATE: new Date().toLocaleDateString(),
        END_DATE: new Date().toLocaleDateString(),
        START_TIME: '08:00:00',
        END_TIME: '22:00:00',
        AGENCES: [],
        GT: {},
        THRESHOLD: 10,
        HNO: -1
      });
    });

});
