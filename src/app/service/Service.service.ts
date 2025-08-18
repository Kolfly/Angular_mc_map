import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NominatimResult { lat: string; lon: string; display_name: string; }

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private citySource = new BehaviorSubject<string>('');
  currentCity$ = this.citySource.asObservable();
  private apiUrl = 'http://localhost:3000/mcdonalds';

  constructor(private http: HttpClient) {}

  changeCity(city: string) { this.citySource.next(city); }

  searchMcDonalds(city: string): Observable<NominatimResult[]> {
    return this.http.get<NominatimResult[]>(`${this.apiUrl}?city=${encodeURIComponent(city)}`);
  }
}
