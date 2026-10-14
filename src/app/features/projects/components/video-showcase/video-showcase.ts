import { Component, ElementRef, input, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  templateUrl: './video-showcase.html',
  styleUrl: './video-showcase.scss',
})
export class VideoShowcaseComponent {
  readonly src = input.required<string>();
  readonly poster = input<string | undefined>();
  readonly title = input.required<string>();
  readonly playLabel = input('Play video');

  protected readonly isPlaying = signal(false);
  private readonly videoRef =
    viewChild<ElementRef<HTMLVideoElement>>('videoRef');

  protected play(): void {
    this.isPlaying.set(true);
    queueMicrotask(() => {
      void this.videoRef()?.nativeElement.play();
    });
  }
}
