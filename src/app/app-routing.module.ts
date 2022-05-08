import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BunniesComponent } from './bunnies/bunnies.component';

const routes: Routes = [
  {
    path: 'bunnies',
    children: [
      {
        path: '',
        component: BunniesComponent,
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
