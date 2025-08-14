import { Component } from '@angular/core';
import { SearchBar } from './search-bar/search-bar';
import { MapComponent } from './map/map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchBar, MapComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {}
