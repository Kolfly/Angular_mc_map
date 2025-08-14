import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { ServiceService, NominatimResult } from '../service/Service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private markersLayer = L.layerGroup();
  private sub?: Subscription;

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.map = L.map('map').setView([46.6, 2.4], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);

    // Icône par défaut Leaflet
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    });

    this.sub = this.service.currentCity$.subscribe((city: string) => {
      if (city) this.findMcDonalds(city);
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.map?.remove();
  }

  private findMcDonalds(city: string) {
    this.service.searchMcDonalds(city).subscribe((results: NominatimResult[]) => {
      this.markersLayer.clearLayers();

      if (!results.length) return;

      const first = results[0];
      const lat = parseFloat(first.lat);
      const lon = parseFloat(first.lon);
      if (!isNaN(lat) && !isNaN(lon)) this.map.setView([lat, lon], 13);

      results.forEach(r => {
        const la = parseFloat(r.lat);
        const lo = parseFloat(r.lon);
        if (!isNaN(la) && !isNaN(lo)) {
          L.marker([la, lo]).bindPopup(r.display_name).addTo(this.markersLayer);
        }
      });
    });
  }
}
