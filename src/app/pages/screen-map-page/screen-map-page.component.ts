import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';

import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-screen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './screen-map-page.component.html',
  styleUrls: ['./screen-map-page.component.css'],
})
export class ScreenMapPageComponent implements AfterViewInit {

  public divElement = viewChild<ElementRef>('map');
  public map = signal<mapboxgl.Map | null>(null);

  public coordinates = signal({
    lng: -70.6,
    lat: -33.4
  });

  public zoom = signal<number>(14);
  public zoomEffect = effect(() => {
    if (!this.map()) return;

    this.map()?.setZoom(this.zoom());
    // this.map()?.zoomTo(this.zoom());
  });

  public async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    const { lng, lat } = this.coordinates();
    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: this.zoom(),
    });

    this.mapListeners(map);
  }

  public mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', (evenet) => {
      const newZoom = evenet.target.getZoom();
      this.zoom.set(newZoom);
    });

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }

}
