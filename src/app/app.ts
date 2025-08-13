import { Component } from '@angular/core';
import {MapComponent} from './map/map';
import { SearchBar } from './search-bar/search-bar';
import { Selection } from './selection/selection';
import { PopUpInfo } from './pop-up-info/pop-up-info';

@Component({
  selector: 'app-root',
  imports: [
    MapComponent,
    SearchBar,
    Selection,
    PopUpInfo
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'mac_donald';
}