import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';

import { environment } from '../../../environments/environment';
import { v4 as UUIDv4 } from 'uuid';

import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-marker-page',
  imports: [JsonPipe],
  templateUrl: './marker-page.component.html',
})
export class MarkerPageComponent implements AfterViewInit {

  public divElement = viewChild<ElementRef>('map');
  public map = signal<mapboxgl.Map | null>(null);
  public markers = signal<Marker[]>([]);

  public async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    // const { lng, lat } = this.coordinates();
    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-70.770005, -33.628872],
      zoom: 14,
    });

    // const marker = new mapboxgl.Marker({ draggable: true, color: 'green' })
    //   .setLngLat([-70.770005, -33.628872])
    //   .addTo(map);

    // marker.on('dragend', (event) => {
    //   console.log(event);
    // });

    this.mapListeners(map);
  }

  public mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => this.mapClick(event));

    this.map.set(map);
  }

  public mapClick(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) return;

    const map = this.map()!;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    ).toUpperCase();

    const coords = event.lngLat;
    const mapboxMarker = new mapboxgl.Marker({ draggable: false, color: color })
      .setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: mapboxMarker,
    }

    // this.markers.set([newMarker, ...this.markers()]);
    this.markers.update((markers) => [newMarker, ...markers]);

    console.log(this.markers());
  }

  public flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;

    this.map()?.flyTo({ center: lngLat });
  }

  public deleteMarker(marker: Marker) {
    if (!this.map()) return;

    const map = this.map();
    marker.mapboxMarker.remove();

    this.markers.set(this.markers().filter((m) => m.id !== marker.id));
  }
}
