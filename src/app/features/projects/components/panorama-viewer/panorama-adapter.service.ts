import { Injectable } from '@angular/core';

export interface PanoramaAdapterOptions {
  readonly src: string;
  readonly container: HTMLElement;
}

@Injectable({ providedIn: 'root' })
export class PanoramaAdapterService {
  async mount(options: PanoramaAdapterOptions): Promise<void> {
    const { container, src } = options;
    container.setAttribute('data-panorama-src', src);
    container.setAttribute('data-panorama-status', 'pending-integration');
  }
}
