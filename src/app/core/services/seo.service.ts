import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { TranslationKey } from '../i18n/translations';
import { LanguageService } from './language.service';

interface SeoGlobalConfig {
  readonly title: string;
  readonly descriptionEs: string;
  readonly descriptionEn: string;
  readonly author: string;
  readonly imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly languageService = inject(LanguageService);

  // Optional override for production. Keep empty to use current runtime origin.
  private readonly canonicalBaseUrl = '';

  private readonly globalConfig: SeoGlobalConfig = {
    title: 'Manuel Cabrera | Full Stack Developer',
    descriptionEs:
      'Full Stack Developer especializado en .NET, Angular, SQL Server y desarrollo de soluciones empresariales.',
    descriptionEn:
      'Full Stack Developer specialized in .NET, Angular, SQL Server, and enterprise solution development.',
    author: 'Manuel Cabrera',
    imageUrl: '/assets/images/og/manuel-cabrera-og.webp',
  };

  applyGlobalSeo(): void {
    const description = this.languageService.isSpanish()
      ? this.globalConfig.descriptionEs
      : this.globalConfig.descriptionEn;

    this.title.setTitle(this.globalConfig.title);
    this.setMeta('description', description);
    this.setMeta('robots', 'index,follow,max-image-preview:large');
    this.setMeta('author', this.globalConfig.author);
    this.setMeta('theme-color', '#07030f');

    this.setPropertyMeta('og:type', 'website');
    this.setPropertyMeta('og:site_name', this.globalConfig.title);
    this.setPropertyMeta('og:title', this.globalConfig.title);
    this.setPropertyMeta('og:description', description);
    this.setPropertyMeta('og:image', this.globalConfig.imageUrl);
    this.setPropertyMeta('og:url', this.toAbsoluteUrl('/'));

    this.setMeta('twitter:card', 'summary_large_image');
    this.setMeta('twitter:title', this.globalConfig.title);
    this.setMeta('twitter:description', description);
    this.setMeta('twitter:image', this.globalConfig.imageUrl);

    this.ensureCanonical('/');
  }

  applyProjectSeo(
    name: string,
    descriptionKey: TranslationKey,
    slug: string,
  ): void {
    const projectTitle = `${name} | Manuel Cabrera`;
    const projectDescription = this.languageService.translate(descriptionKey);

    this.title.setTitle(projectTitle);
    this.setMeta('description', projectDescription);

    this.setPropertyMeta('og:title', projectTitle);
    this.setPropertyMeta('og:description', projectDescription);
    this.setPropertyMeta('og:url', this.toAbsoluteUrl(`/projects/${slug}`));

    this.setMeta('twitter:title', projectTitle);
    this.setMeta('twitter:description', projectDescription);

    this.ensureCanonical(`/projects/${slug}`);
  }

  private setMeta(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setPropertyMeta(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private ensureCanonical(path: string): void {
    const head = this.document.head;
    if (!head) {
      return;
    }

    const canonicalHref = this.toAbsoluteUrl(path);
    let link = head.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }

    link.setAttribute('href', canonicalHref);
  }

  private toAbsoluteUrl(path: string): string {
    const configuredBase = this.canonicalBaseUrl.trim();
    const origin =
      configuredBase.length > 0
        ? configuredBase.replace(/\/$/, '')
        : (this.document.location?.origin ?? '');

    if (!origin) {
      return path;
    }

    return `${origin}${path}`;
  }
}
