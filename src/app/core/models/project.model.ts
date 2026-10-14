import { TranslationKey } from '../i18n/translations';

export interface ArchitectureNode {
  readonly id: string;
  readonly label: string;
  readonly subtitle?: string;
  readonly type?:
    | 'client'
    | 'api'
    | 'domain'
    | 'data'
    | 'storage'
    | 'service'
    | 'sync'
    | 'offline'
    | 'external';
  readonly lane?: 'main' | 'side';
}

export interface ArchitectureConnection {
  readonly from: string;
  readonly to: string;
  readonly label?: string;
}

export interface ProjectArchitecture {
  readonly nodes: readonly ArchitectureNode[];
  readonly connections: readonly ArchitectureConnection[];
  readonly layers?: readonly string[];
  readonly supportingServices?: readonly string[];
}

export interface ProjectImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
}

export interface ProjectImageMedia {
  readonly kind: 'image';
  readonly image: ProjectImageAsset;
}

export interface ProjectGalleryMedia {
  readonly kind: 'gallery';
  readonly images: readonly ProjectImageAsset[];
  readonly startIndex?: number;
}

export interface ProjectVideoMedia {
  readonly kind: 'video';
  readonly src: string;
  readonly poster?: string;
  readonly title: string;
}

export interface ProjectPanoramaMedia {
  readonly kind: 'panorama';
  readonly src: string;
  readonly thumbnail?: string;
  readonly title: string;
}

export type ProjectMedia =
  | ProjectImageMedia
  | ProjectGalleryMedia
  | ProjectVideoMedia
  | ProjectPanoramaMedia;

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly number: string;
  readonly name: string;
  readonly categoryKey: TranslationKey;
  readonly shortDescriptionKey: TranslationKey;
  readonly descriptionKey: TranslationKey;
  readonly problemKey: TranslationKey;
  readonly solutionKey: TranslationKey;
  readonly badge: string | null;
  readonly badgeKey?: TranslationKey | null;
  readonly technologies: readonly string[];
  readonly featureKeys: readonly TranslationKey[];
  readonly technicalChallengeKeys: readonly TranslationKey[];
  readonly architecture: ProjectArchitecture;
  readonly media?: readonly ProjectMedia[];
  readonly cover: string | null;
  readonly screenshots?: readonly string[];
  readonly panorama360?: ProjectPanorama | null;
  readonly video?: ProjectVideo | null;
}

export interface ProjectPanorama {
  readonly src: string;
  readonly thumbnail: string;
}

export interface ProjectVideo {
  readonly src: string;
  readonly poster: string;
}
