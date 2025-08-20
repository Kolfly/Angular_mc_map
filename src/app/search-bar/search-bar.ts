import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service/Service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class SearchBar {
  city = '';
  suggestions: any[] = [];

  constructor(private service: ServiceService) {}

  onInputChange() {
    if (this.city.trim().length > 2) {
      this.service.getCitySuggestions(this.city.trim()).subscribe(data => {
        this.suggestions = data;
      });
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: any) {
    this.city = suggestion.display_name;
    this.suggestions = [];
    this.search();
  }

  search() {
    if (this.city.trim()) this.service.changeCity(this.city.trim());
  }
}

