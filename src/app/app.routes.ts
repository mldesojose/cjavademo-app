import { Routes } from '@angular/router';
import { CursosComponent } from './components/cursos/cursos.component';
import { FormComponent } from './components/form/form.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { FormeditComponent } from './components/formedit/formedit.component';

export const routes: Routes = [
    {path: '', redirectTo: 'cursos', pathMatch: 'full'},
    {path: 'cursos', component: CursosComponent},
    {path: 'cursos/form', component: FormComponent},
    {path: 'cursos/form/:id', component: FormeditComponent},
    {path: 'demomaterial', component: TablaComponent}
];
