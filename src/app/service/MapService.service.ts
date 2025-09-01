import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
  name?: string;
}

@Injectable({ providedIn: 'root' })
export class MapService {
  private citySource = new BehaviorSubject<string>('');
  currentCity$ = this.citySource.asObservable();
  private apiUrl = 'http://localhost:3000/mcdonalds';

  private selectedMcDoSource = new BehaviorSubject<NominatimResult | null>(null);
  selectedMcDo$ = this.selectedMcDoSource.asObservable();

  constructor(private http: HttpClient) {}

  changeCity(city: string) {
    this.citySource.next(city);
  }

  searchMcDonalds(city: string): Observable<NominatimResult[]> {
    return this.http.get<NominatimResult[]>(`${this.apiUrl}?city=${encodeURIComponent(city)}`);
  }

  getCitySuggestions(query: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/autocomplete?q=${query}`);
  }

  selectMcDo(mcdo: NominatimResult) {
    this.selectedMcDoSource.next(mcdo);
  }
}