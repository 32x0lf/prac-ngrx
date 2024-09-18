import { Routes } from '@angular/router';
import { DetailComponent } from './Shared/Component/detail.component';
import { AppComponent } from './app.component';
import { MainComponent } from './Contacts/Main/main.component';

export const routes: Routes = [
    {path: '', component:MainComponent, pathMatch: 'full'},
    {
        path:'details/:id',
        component:DetailComponent
    }
];
