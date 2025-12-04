import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PollutionService} from '../services/pollution.service';
import { Pollution } from '../models/pollution.model';


@Component({
  selector: 'app-pollution-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './pollution-form.component.html',
  styleUrls: ['./pollution-form.component.css']
})
export class PollutionFormComponent {
  @Input() pollutionToEdit: Pollution | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  pollutionForm: FormGroup;
  typesPollution = ['Plastique', 'Chimique', 'Dépôt sauvage', 'Eau', 'Air', 'Autre'];

  constructor(private fb: FormBuilder, private pollutionService: PollutionService) {
    this.pollutionForm = this.fb.group({
      id: [null],
      titre: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      dateObservation: ['', Validators.required],
      lieu: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]],
      photoUrl: ['']
    });
  }

  ngOnChanges() {
    if (this.pollutionToEdit) {
      this.pollutionForm.patchValue(this.pollutionToEdit);
    } else {
      this.pollutionForm.reset();
    }
  }

  onSubmit() {
  if (this.pollutionForm.invalid) return;

  const value = this.pollutionForm.value as Pollution;

  if (value.id) {
    this.pollutionService.updatePollution(value.id!, value);
  } else {
    const { id, ...payload } = value;
    this.pollutionService.addPollution(payload);
  }

  this.pollutionForm.reset();
  this.formSubmitted.emit();
}


  cancel() {
    this.pollutionForm.reset();
    this.formSubmitted.emit();
  }
}
