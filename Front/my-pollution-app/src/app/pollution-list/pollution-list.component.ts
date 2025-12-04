import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollutionService} from '../services/pollution.service';
import { Pollution } from '../models/pollution.model';
import { PollutionFormComponent } from '../pollution-form/pollution-form.component';
import { PollutionRecapComponent } from '../pollution-recap/pollution-recap.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pollution-list',
  standalone: true,
  imports: [CommonModule, PollutionFormComponent, PollutionRecapComponent],
  templateUrl: './pollution-list.component.html',
  styleUrls: ['./pollution-list.component.css']
})
export class PollutionListComponent implements OnInit {
  pollutions$!: Observable<Pollution[]>;
  showForm = false;
  pollutionToEdit: Pollution | null = null;
  selectedPollution: Pollution | null = null;

  constructor(private pollutionService: PollutionService) {}

  ngOnInit() {
    this.pollutions$ = this.pollutionService.getPollutions();
  }

  addNew() {
  this.pollutionToEdit = null;
  this.showForm = true;
  this.selectedPollution = null;
  }

  edit(p: Pollution) {
  this.pollutionToEdit = p;
  this.showForm = true;
  this.selectedPollution = null;
  }


  delete(p: Pollution) {
    if (!p.id) return;
    this.pollutionService.deletePollution(p.id);
    this.refreshList();
    this.selectedPollution = null;
  }


  refreshList() {
    this.pollutions$ = this.pollutionService.getPollutions();
  }

  showDetails(p: Pollution) {
    this.selectedPollution = p;
    this.showForm = false;
  }

  formClosed() {
  this.showForm = false;
  this.refreshList();
  this.selectedPollution = null;
}


}
