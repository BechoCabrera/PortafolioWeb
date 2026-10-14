import { NgOptimizedImage } from '@angular/common';
import { computed } from '@angular/core';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-project-image',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './project-image.html',
  styleUrl: './project-image.scss',
})
export class ProjectImageComponent {
  readonly src = input.required<string>();
  readonly alt = input.required<string>();
  readonly caption = input<string | undefined>();

  protected readonly isMobileScreenshot = computed(() =>
    /\/mobile\//i.test(this.src()),
  );
}
