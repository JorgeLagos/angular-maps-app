import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';

import { environment } from '../../../../environments/environment';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map-page',
  imports: [],
  templateUrl: './mini-map-page.component.html',
  styleUrl: './mini-map-page.component.css'
})
export class MiniMapPageComponent implements AfterViewInit {

  public divElement = viewChild<ElementRef>('map');
  public lngLat = input.required<{ lng: number, lat: number }>();
  public zoom = input<number>(14);

  public async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    // const { lng, lat } = this.coordinates();
    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
      pitch: 50,
    });

    const marker = new mapboxgl.Marker({ draggable: false, color: 'green' })
      .setLngLat(this.lngLat())
      .addTo(map);
  }

}
