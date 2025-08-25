import { Component, OnInit } from '@angular/core';
import { ServiceService, NominatimResult } from '../service/Service.service';
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

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.selectedMcDo$.subscribe(mcdo => {
      this.selectedMcDo = mcdo;
    });
  }

  continuer() {
    if (this.selectedMcDo) {
      alert(`Vous continuez avec : ${this.selectedMcDo.name}`);
      // Ici tu peux ajouter la navigation ou autre action
    }
  }
}
