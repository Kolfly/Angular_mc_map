import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MapService, NominatimResult } from './MapService.service';

describe('MapService', () => {
  let service: MapService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MapService]
    });
    service = TestBed.inject(MapService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty city', () => {
    let receivedCity: string | undefined;
    service.currentCity$.subscribe(city => {
      receivedCity = city;
    });
    expect(receivedCity).toBe('');
  });

  it('should initialize with no selected McDonald', () => {
    let receivedMcDo: NominatimResult | null | undefined;
    service.selectedMcDo$.subscribe(mcdo => {
      receivedMcDo = mcdo;
    });
    expect(receivedMcDo).toBeNull();
  });

  it('should change city and emit new value', () => {
    const testCity = 'Paris';
    let receivedCity: string | undefined;

    service.currentCity$.subscribe(city => {
      receivedCity = city;
    });

    service.changeCity(testCity);

    expect(receivedCity).toBe(testCity);
  });

  it('should search McDonalds and make HTTP request', () => {
    const testCity = 'Paris';
    const mockResults: NominatimResult[] = [
      {
        lat: '48.8566',
        lon: '2.3522',
        display_name: 'Paris, France',
        name: "McDonald's"
      }
    ];

    service.searchMcDonalds(testCity).subscribe(results => {
      expect(results).toEqual(mockResults);
    });

    const req = httpMock.expectOne(`http://localhost:3000/mcdonalds?city=${encodeURIComponent(testCity)}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResults);
  });

  it('should get city suggestions and make HTTP request', () => {
    const testQuery = 'Par';
    const mockSuggestions = [
      {
        display_name: 'Paris, France',
        lat: '48.8566',
        lon: '2.3522'
      }
    ];

    service.getCitySuggestions(testQuery).subscribe(suggestions => {
      expect(suggestions).toEqual(mockSuggestions);
    });

    const req = httpMock.expectOne(`http://localhost:3000/autocomplete?q=${testQuery}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSuggestions);
  });

  it('should select McDonald and emit new value', () => {
    const testMcDo: NominatimResult = {
      lat: '48.8566',
      lon: '2.3522',
      display_name: 'Paris, France',
      name: "McDonald's"
    };
    const receivedValues: (NominatimResult | null)[] = [];

    service.selectedMcDo$.subscribe(mcdo => {
      receivedValues.push(mcdo);
    });

    service.selectMcDo(testMcDo);

    expect(receivedValues[0]).toBeNull();
    expect(receivedValues[1]).toEqual(testMcDo);
    expect(receivedValues.length).toBe(2);
  });

  it('should handle HTTP error for searchMcDonalds', () => {
    const testCity = 'Paris';

    service.searchMcDonalds(testCity).subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
      }
    });

    const req = httpMock.expectOne(`http://localhost:3000/mcdonalds?city=${encodeURIComponent(testCity)}`);
    req.flush('Server Error', { status: 500, statusText: 'Server Error' });
  });

  it('should handle HTTP error for getCitySuggestions', () => {
    const testQuery = 'Par';

    service.getCitySuggestions(testQuery).subscribe({
      next: () => fail('Should have failed'),
      error: (error) => {
        expect(error.status).toBe(400);
      }
    });

    const req = httpMock.expectOne(`http://localhost:3000/autocomplete?q=${testQuery}`);
    req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
  });
});