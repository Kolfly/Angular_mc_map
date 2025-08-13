import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet'; // Import du module Leaflet
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    LeafletModule // Import nécessaire pour activer les directives ngx-leaflet
  ],
  templateUrl: './map.html',
  styleUrls: ['./map.scss'],
})
export class MapComponent implements OnInit {
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 13,
    center: L.latLng(48.8566, 2.3522), // Paris
  };

  // Liste des marqueurs
  markers: L.Marker[] = [];

  // Ajouter des marqueurs initiaux
  ngOnInit(): void {
    this.addMarker(48.8566, 2.3522, 'Bienvenue à Paris !');
    this.addMarker(48.8584, 2.2945, 'Tour Eiffel');
    this.addMarker(48.8606, 2.3376, 'Musée du Louvre');
  }

  // Méthode pour ajouter un marqueur
  addMarker(lat: number, lng: number, popupText: string): void {
    const marker = L.marker([lat, lng], {
      icon: L.icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
        shadowUrl: 'assets/marker-shadow.png',
      }),
    }).bindPopup(popupText);

    this.markers.push(marker);
  }
}