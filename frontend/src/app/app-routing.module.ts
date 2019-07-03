import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './buscar/buscar.component';
import { HeroesComponent } from './heroes/heroes.component';


const routes: Routes = [{path: '' ,component: BuscarComponent, pathMatch: 'full'},
{
  path:'peliculas',
  component: BuscarComponent
},
{
  path:'heroes',
  component: HeroesComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
