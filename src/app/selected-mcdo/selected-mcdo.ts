import { Component, OnInit } from '@angular/core';
import { MapService, NominatimResult } from '../service/MapService.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-selected-mcdo',
  templateUrl: './selected-mcdo.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./selected-mcdo.scss']
})
export class SelectedMcdoComponent implements OnInit {
  selectedMcDo: NominatimResult | null = null;

  constructor(private service: MapService) {}

  ngOnInit(): void {
    this.service.selectedMcDo$.subscribe(mcdo => {
      this.selectedMcDo = mcdo;
    });
  }

  continuer() {
    if (this.selectedMcDo) {
      alert(`Vous continuez avec : ${this.selectedMcDo.name}`);
    }
  }
}
