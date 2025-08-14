import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private citySource = new BehaviorSubject<string>('');
  currentCity$ = this.citySource.asObservable();

  constructor(private http: HttpClient) {}

  changeCity(city: string) {
    this.citySource.next(city);
  }

  searchMcDonalds(city: string): Observable<NominatimResult[]> {
    const query = `McDonald's, ${city}`;
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=100&addressdetails=1&q=${encodeURIComponent(query)}`;
    return this.http.get<NominatimResult[]>(url);
  }
  
}
