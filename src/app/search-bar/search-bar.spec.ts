import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { SearchBar } from './search-bar';
import { ServiceService } from '../service/Service.service';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;
  let mockService: jasmine.SpyObj<ServiceService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ServiceService', ['getCitySuggestions', 'changeCity']);

    await TestBed.configureTestingModule({
      imports: [SearchBar, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ServiceService, useValue: spy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    mockService = TestBed.inject(ServiceService) as jasmine.SpyObj<ServiceService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty city and suggestions', () => {
    expect(component.city).toBe('');
    expect(component.suggestions).toEqual([]);
    expect(component.searchControl.value).toBe('');
  });

  it('should call getCitySuggestions when city length > 2', fakeAsync(() => {
    const mockSuggestions = [{ display_name: 'Paris, France', lat: '48.8566', lon: '2.3522' }];
    mockService.getCitySuggestions.and.returnValue(of(mockSuggestions));

    component.city = 'Par';
    component.searchControl.setValue('Par');
    
    tick(300); // Wait for debounce
    
    expect(mockService.getCitySuggestions).toHaveBeenCalledWith('Par');
    expect(component.suggestions).toEqual(mockSuggestions);
  }));

  it('should clear suggestions when city length <= 2', fakeAsync(() => {
    component.city = 'Pa';
    component.searchControl.setValue('Pa');
    
    tick(300);
    
    expect(component.suggestions).toEqual([]);
  }));

  it('should select suggestion and call search', () => {
    const suggestion = { display_name: 'Paris, France', lat: '48.8566', lon: '2.3522' };
    spyOn(component, 'search');

    component.selectSuggestion(suggestion);

    expect(component.city).toBe('Paris, France');
    expect(component.suggestions).toEqual([]);
    expect(component.search).toHaveBeenCalled();
  });

  it('should call changeCity when search is called with valid city', () => {
    component.city = 'Paris';
    
    component.search();
    
    expect(mockService.changeCity).toHaveBeenCalledWith('Paris');
  });

  it('should not call changeCity when city is empty', () => {
    component.city = '';
    
    component.search();
    
    expect(mockService.changeCity).not.toHaveBeenCalled();
  });
});
