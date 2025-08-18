import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { ServiceService, NominatimResult } from '../service/Service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private markers = L.layerGroup();
  private sub?: Subscription;

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.map = L.map('map').setView([46.6, 2.4], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    this.markers.addTo(this.map);

    // Icône par défaut Leaflet
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.sub = this.service.currentCity$.subscribe(city => {
      if (city) this.loadMcDonalds(city);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.map.remove();
  }

  private loadMcDonalds(city: string) {
    this.service.searchMcDonalds(city).subscribe((results: NominatimResult[]) => {
      this.markers.clearLayers();
      if (!results.length) return;

      const first = results[0];
      this.map.setView([parseFloat(first.lat), parseFloat(first.lon)], 13);

      results.forEach(r => {
        const lat = parseFloat(r.lat);
        const lon = parseFloat(r.lon);
        if (!isNaN(lat) && !isNaN(lon)) {
          L.marker([lat, lon])
            .bindPopup(r.display_name)
            .addTo(this.markers);
        }
      });
    });
  }
}
