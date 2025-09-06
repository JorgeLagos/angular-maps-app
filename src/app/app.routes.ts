import { Routes } from '@angular/router';

import { ScreenMapPageComponent } from './pages/screen-map-page/screen-map-page.component';
import { MarkerPageComponent } from './pages/marker-page/marker-page.component';
import { HousePageComponent } from './pages/house-page/house-page.component';

export const routes: Routes = [
  {
    title: 'Screen Map',
    path: 'screenmap',
    component: ScreenMapPageComponent
  },
  {
    title: 'Markers',
    path: 'markers',
    component: MarkerPageComponent
  },
  {
    title: 'Houses',
    path: 'houses',
    component: HousePageComponent
  },
  {
    path: '**',
    redirectTo: 'screenmap'
  },
];
