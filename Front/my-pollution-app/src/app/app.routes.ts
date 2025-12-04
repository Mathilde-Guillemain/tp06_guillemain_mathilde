import { Routes } from '@angular/router';
import { PollutionListComponent } from './pollution-list/pollution-list.component';
import { PollutionFormComponent } from './pollution-form/pollution-form.component';
import { PollutionRecapComponent } from './pollution-recap/pollution-recap.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'pollutions', pathMatch: 'full' },
  { path: 'pollutions', component: PollutionListComponent },
  { path: 'add-pollution', component: PollutionFormComponent },
  { path: 'pollution/:id', component: PollutionRecapComponent },
  { path: 'utilisateur', component: UserListComponent },
  { path: 'add-user', component: UserFormComponent },
];