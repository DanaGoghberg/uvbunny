import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BunniesComponent } from './bunnies/bunnies.component';
import { BunnyComponent } from './bunny/bunny.component'

const routes: Routes = [
  {
    path: 'bunnies',
    children: [
      {
        path: '',
        component: BunniesComponent,
      },
      {
        path: ':id',
        component: BunnyComponent,
        pathMatch: 'prefix',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'bunnies',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
