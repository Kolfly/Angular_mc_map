import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { MapService, NominatimResult } from '../service/MapService.service';

interface LeafletPopupEvent {
  popup: {
    getElement(): HTMLElement;
  };
}
import { Subscription } from 'rxjs';
import { SelectedMcdoComponent } from '../selected-mcdo/selected-mcdo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,                
  imports: [CommonModule, SelectedMcdoComponent],
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private markers = L.layerGroup();
  private sub?: Subscription;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.map = L.map('map').setView([46.6, 2.4], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.markers.addTo(this.map);

    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'assets/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.sub = this.mapService.currentCity$.subscribe(city => {
      if (city) this.loadMcDonalds(city);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.map.remove();
  }

  private loadMcDonalds(city: string) {
    this.mapService.searchMcDonalds(city).subscribe((results: NominatimResult[]) => {
      this.markers.clearLayers();
      if (!results.length) return;

      const first = results[0];
      this.map.setView([parseFloat(first.lat), parseFloat(first.lon)], 13);

      results.forEach(r => {
        const lat = parseFloat(r.lat);
        const lon = parseFloat(r.lon);
        if (isNaN(lat) || isNaN(lon)) return;

        const marker = L.marker([lat, lon]);

        const popupContent = `
          <b>${r.name || 'McDonald\'s'}</b><br/>
          ${r.display_name}<br/>
          <button class="choose-btn"
                  data-lat="${lat}"
                  data-lon="${lon}"
                  data-name="${r.name || 'McDonald\'s'}"
                  data-display="${r.display_name}">
            Choisir
          </button>
        `;
        marker.bindPopup(popupContent);
        marker.addTo(this.markers);
      });

      this.map.on('popupopen', (e: LeafletPopupEvent) => {
        const popup = e.popup.getElement();
        const btn = popup.querySelector('.choose-btn');
        if (btn) {
          btn.addEventListener('click', () => {
            const mcdo: NominatimResult = {
              lat: btn.getAttribute('data-lat') || '',
              lon: btn.getAttribute('data-lon') || '',
              name: btn.getAttribute('data-name') || 'McDonald\'s',
              display_name: btn.getAttribute('data-display') || ''
            };
            this.mapService.selectMcDo(mcdo);
          }, { once: true });
        }
      });
    });
  }
}
