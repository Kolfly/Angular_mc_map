import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapService, CitySuggestion } from '../service/MapService.service';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule]
})
export class SearchBar {
  city = '';
  suggestions: CitySuggestion[] = [];
  searchControl: FormControl = new FormControl('');
  private isSelectingSuggestion = false;

  constructor(private mapService: MapService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(225)
    ).subscribe(value => {
      if (this.isSelectingSuggestion) {
        this.isSelectingSuggestion = false;
        return;
      }
      if (this.city.trim().length > 2) {
        this.mapService.getCitySuggestions(this.city.trim()).subscribe(data => {
          this.suggestions = data;
        });
      } else {
        this.suggestions = [];
      }
    });
  }

 

  selectSuggestion(suggestion: CitySuggestion) {
    this.isSelectingSuggestion = true;
    this.city = suggestion.display_name;
    this.searchControl.setValue(this.city, { emitEvent: true });
    this.suggestions = [];
    this.search();
  }

  search() {
    if (this.city.trim()) this.mapService.changeCity(this.city.trim());
  }
}

