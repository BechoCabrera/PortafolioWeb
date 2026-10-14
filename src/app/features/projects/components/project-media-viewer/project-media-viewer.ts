import { Component, computed, input } from '@angular/core';

import {
  Project,
  ProjectGalleryMedia,
  ProjectImageMedia,
  ProjectMedia,
  ProjectPanoramaMedia,
  ProjectVideoMedia,
} from '../../../../core/models/project.model';
import { ProjectGalleryComponent } from '../project-gallery/project-gallery';
import { ProjectImageComponent } from '../project-image/project-image';
import { PanoramaViewerComponent } from '../panorama-viewer/panorama-viewer';
import { VideoShowcaseComponent } from '../video-showcase/video-showcase';

@Component({
  selector: 'app-project-media-viewer',
  standalone: true,
  imports: [
    ProjectImageComponent,
    ProjectGalleryComponent,
    VideoShowcaseComponent,
    PanoramaViewerComponent,
  ],
  templateUrl: './project-media-viewer.html',
  styleUrl: './project-media-viewer.scss',
})
export class ProjectMediaViewerComponent {
  readonly project = input.required<Project>();
  readonly placeholder = input.required<string>();
  readonly previousLabel = input('Previous image');
  readonly nextLabel = input('Next image');
  readonly galleryLabel = input('Project gallery');
  readonly desktopSectionLabel = input('Desktop');
  readonly mobileSectionLabel = input('Mobile');
  readonly thumbnailsLabel = input('Gallery thumbnails');
  readonly selectImageLabel = input('Select image');
  readonly videoPlayLabel = input('Play video');
  readonly panoramaHint = input('360 viewer prepared for future integration');

  protected readonly normalizedMedia = computed<readonly ProjectMedia[]>(() => {
    const project = this.project();
    if (project.media && project.media.length > 0) {
      return project.media;
    }

    const fallback: ProjectMedia[] = [];

    if (project.screenshots && project.screenshots.length === 1) {
      fallback.push({
        kind: 'image',
        image: {
          src: project.screenshots[0],
          alt: `${project.name} screenshot`,
        },
      });
    }

    if (project.screenshots && project.screenshots.length > 1) {
      fallback.push({
        kind: 'gallery',
        images: project.screenshots.map((src, index) => ({
          src,
          alt: `${project.name} screenshot ${index + 1}`,
        })),
      });
    }

    if (project.video) {
      fallback.push({
        kind: 'video',
        src: project.video.src,
        poster: project.video.poster,
        title: `${project.name} video`,
      });
    }

    if (project.panorama360) {
      fallback.push({
        kind: 'panorama',
        src: project.panorama360.src,
        thumbnail: project.panorama360.thumbnail,
        title: `${project.name} panorama`,
      });
    }

    return fallback;
  });

  protected readonly imageMedia = computed(() =>
    this.normalizedMedia().filter(
      (item): item is ProjectImageMedia => item.kind === 'image',
    ),
  );

  protected readonly galleryMedia = computed(() =>
    this.normalizedMedia().filter(
      (item): item is ProjectGalleryMedia => item.kind === 'gallery',
    ),
  );

  protected readonly desktopGalleryMedia = computed<
    readonly ProjectGalleryMedia[]
  >(() =>
    this.galleryMedia()
      .map((item) => ({
        ...item,
        images: item.images.filter((image) => !this.isMobileImage(image.src)),
      }))
      .filter((item) => item.images.length > 0),
  );

  protected readonly mobileGalleryMedia = computed<readonly ProjectGalleryMedia[]>(
    () =>
      this.galleryMedia()
        .map((item) => ({
          ...item,
          images: item.images.filter((image) => this.isMobileImage(image.src)),
        }))
        .filter((item) => item.images.length > 0),
  );

  protected readonly videoMedia = computed(() =>
    this.normalizedMedia().filter(
      (item): item is ProjectVideoMedia => item.kind === 'video',
    ),
  );

  protected readonly panoramaMedia = computed(() =>
    this.normalizedMedia().filter(
      (item): item is ProjectPanoramaMedia => item.kind === 'panorama',
    ),
  );

  private isMobileImage(src: string): boolean {
    return /\/mobile\//i.test(src);
  }
}
