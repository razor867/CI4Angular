import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuratmasukComponent } from './suratmasuk/suratmasuk.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'suratmasuk',
    component: SuratmasukComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
