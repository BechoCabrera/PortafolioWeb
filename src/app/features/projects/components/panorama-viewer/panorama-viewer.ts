import { Component, ElementRef, inject, input, viewChild } from '@angular/core';

import { PanoramaAdapterService } from './panorama-adapter.service';

@Component({
  selector: 'app-panorama-viewer',
  standalone: true,
  templateUrl: './panorama-viewer.html',
  styleUrl: './panorama-viewer.scss',
})
export class PanoramaViewerComponent {
  private readonly adapter = inject(PanoramaAdapterService);

  readonly src = input.required<string>();
  readonly title = input.required<string>();
  readonly hint = input('360 viewer prepared for future integration');

  private readonly containerRef =
    viewChild<ElementRef<HTMLElement>>('containerRef');

  protected async initializePanorama(): Promise<void> {
    const container = this.containerRef()?.nativeElement;
    if (!container) {
      return;
    }

    await this.adapter.mount({ src: this.src(), container });
  }
}
