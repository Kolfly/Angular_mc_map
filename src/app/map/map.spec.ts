import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { MapComponent } from './map';
import { ServiceService, NominatimResult } from '../service/Service.service';

// Mock Leaflet
const mockMap = {
  setView: jasmine.createSpy('setView').and.returnValue({}),
  remove: jasmine.createSpy('remove'),
  on: jasmine.createSpy('on')
};

const mockLayerGroup = {
  addTo: jasmine.createSpy('addTo'),
  clearLayers: jasmine.createSpy('clearLayers')
};

const mockMarker = {
  bindPopup: jasmine.createSpy('bindPopup').and.returnValue({}),
  addTo: jasmine.createSpy('addTo')
};

const mockL = {
  map: jasmine.createSpy('map').and.returnValue(mockMap),
  tileLayer: jasmine.createSpy('tileLayer').and.returnValue({ addTo: jasmine.createSpy('addTo') }),
  layerGroup: jasmine.createSpy('layerGroup').and.returnValue(mockLayerGroup),
  marker: jasmine.createSpy('marker').and.returnValue(mockMarker),
  icon: jasmine.createSpy('icon').and.returnValue({}),
  Marker: { prototype: { options: {} } }
};

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let mockService: jasmine.SpyObj<ServiceService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ServiceService', ['searchMcDonalds', 'selectMcDo'], {
      currentCity$: of('Paris')
    });

    // Mock Leaflet globally
    (window as any).L = mockL;

    await TestBed.configureTestingModule({
      imports: [MapComponent, HttpClientTestingModule],
      providers: [
        { provide: ServiceService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(ServiceService) as jasmine.SpyObj<ServiceService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize map on ngOnInit', () => {
    const mockResults: NominatimResult[] = [
      { lat: '48.8566', lon: '2.3522', display_name: 'Paris, France', name: "McDonald's" }
    ];
    mockService.searchMcDonalds.and.returnValue(of(mockResults));

    component.ngOnInit();

    expect(mockL.map).toHaveBeenCalledWith('map');
    expect(mockMap.setView).toHaveBeenCalledWith([46.6, 2.4], 6);
  });

  it('should call searchMcDonalds when city changes', () => {
    const mockResults: NominatimResult[] = [
      { lat: '48.8566', lon: '2.3522', display_name: 'Paris, France', name: "McDonald's" }
    ];
    mockService.searchMcDonalds.and.returnValue(of(mockResults));

    component.ngOnInit();

    expect(mockService.searchMcDonalds).toHaveBeenCalledWith('Paris');
  });

  it('should clean up on ngOnDestroy', () => {
    component.ngOnInit();
    component.ngOnDestroy();

    expect(mockMap.remove).toHaveBeenCalled();
  });

  it('should handle empty search results', () => {
    mockService.searchMcDonalds.and.returnValue(of([]));

    component.ngOnInit();

    expect(mockLayerGroup.clearLayers).toHaveBeenCalled();
  });

  it('should create markers for search results', () => {
    const mockResults: NominatimResult[] = [
      { lat: '48.8566', lon: '2.3522', display_name: 'Paris, France', name: "McDonald's" },
      { lat: '45.7640', lon: '4.8357', display_name: 'Lyon, France', name: "McDonald's" }
    ];
    mockService.searchMcDonalds.and.returnValue(of(mockResults));

    component.ngOnInit();

    expect(mockL.marker).toHaveBeenCalledTimes(2);
    expect(mockMarker.addTo).toHaveBeenCalledTimes(2);
  });
});
