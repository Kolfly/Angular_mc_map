import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
}

export interface CitySuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

@Injectable({ providedIn: 'root' })
export class MapService {
  private citySource = new BehaviorSubject<string>('');
  currentCity$ = this.citySource.asObservable();
  private apiUrl = 'https://wacdoang.online/mcdonalds';

  private selectedMcDoSource = new BehaviorSubject<NominatimResult | null>(null);
  selectedMcDo$ = this.selectedMcDoSource.asObservable();

  constructor(private http: HttpClient) {}

  changeCity(city: string) {
    this.citySource.next(city);
  }

  searchMcDonalds(city: string): Observable<NominatimResult[]> {
    return this.http.get<NominatimResult[]>(`${this.apiUrl}?city=${encodeURIComponent(city)}`);
  }

  getCitySuggestions(query: string): Observable<CitySuggestion[]> {
    return this.http.get<CitySuggestion[]>(`https://wacdoang.online/autocomplete?q=${query}`);
  }

  selectMcDo(mcdo: NominatimResult) {
    this.selectedMcDoSource.next(mcdo);
  }
}