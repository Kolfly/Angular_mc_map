import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapService } from '../service/MapService.service';
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
  suggestions: any[] = [];
 searchControl: FormControl = new FormControl('');
  constructor(private service: MapService) {
    this.searchControl.valueChanges.pipe(
  debounceTime(225)
).subscribe(value => {
  if (this.city.trim().length > 2) {
      this.service.getCitySuggestions(this.city.trim()).subscribe(data => {
        this.suggestions = data;
      });
    } else {
      this.suggestions = [];
    }
});
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

