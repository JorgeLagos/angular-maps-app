import { Component, signal } from '@angular/core';
import { v4 as UUIDv4 } from 'uuid';

import { MiniMapPageComponent } from "../../maps/components/mini-map-page/mini-map-page.component";

interface HouseProperty {
  id: string;
  name: string;
  description: string;
  price: number;
  lngLat: { lng: number; lat: number };
  tags: string[];
}


@Component({
  selector: 'app-house-page',
  imports: [MiniMapPageComponent],
  templateUrl: './house-page.component.html',
})
export class HousePageComponent {

  public houses = signal<HouseProperty[]>([
    {
      id: UUIDv4(),
      name: 'Villa Serenidad',
      description:
        'Un refugio tranquilo con vistas panorámicas al mar y jardines exuberantes.',
      price: 500_000,
      lngLat: { lng: -0.861526, lat: 41.65649 },
      tags: ['Villa', 'Mar', 'Jardines'],
    },
    {
      id: UUIDv4(),
      name: 'Casa del Sol',
      description:
        'Una casa luminosa y acogedora con amplias terrazas y piscina privada.',
      price: 750_000,
      lngLat: { lng: -0.862, lat: 41.657 },
      tags: ['Casa', 'Sol', 'Terrazas'],
    },
    {
      id: UUIDv4(),
      name: 'Residencia Esmeralda',
      description:
        'Elegante propiedad con acabados de lujo y un diseño arquitectónico moderno.',
      price: 1_200_000,
      lngLat: { lng: -0.863, lat: 41.658 },
      tags: ['Casa', 'Esmeralda', 'Acabados'],
    },
    {
      id: UUIDv4(),
      name: 'Hacienda del Lago',
      description:
        'Encantadora hacienda con acceso directo al lago y un entorno natural impresionante.',
      price: 950_000,
      lngLat: { lng: -0.864, lat: 41.659 },
      tags: ['Casa', 'Lago', 'Hacienda'],
    },
  ]);

}
