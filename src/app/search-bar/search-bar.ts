import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../service/Service.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss'],
  standalone: true,
  imports: [FormsModule]
})
export class SearchBar {
  city = '';
  constructor(private service: ServiceService) {}

  search() {
    if (this.city.trim()) this.service.changeCity(this.city.trim());
  }
}
