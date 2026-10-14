import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  inject,
} from '@angular/core';

import { TranslationKey } from '../../core/i18n/translations';
import { GsapMotionService } from '../../core/services/gsap-motion.service';
import { LanguageService } from '../../core/services/language.service';
import { MotionPreferencesService } from '../../core/services/motion-preferences.service';
import { SeoService } from '../../core/services/seo.service';
import { Footer } from '../../layout/footer/footer';
import { Header } from '../../layout/header/header';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Experience } from './sections/experience/experience';
import { Hero } from './sections/hero/hero';
import { ProjectsSection } from './sections/projects/projects-section';
import { Services } from './sections/services/services';
import { TechStack } from './sections/tech-stack/tech-stack';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Header,
    Hero,
    About,
    Services,
    TechStack,
    Experience,
    ProjectsSection,
    Contact,
    Footer,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly languageService = inject(LanguageService);
  private readonly motionPreferences = inject(MotionPreferencesService);
  private readonly gsapMotion = inject(GsapMotionService);
  private readonly seoService = inject(SeoService);

  private readonly cleanupCallbacks: Array<() => void> = [];

  constructor() {
    effect(() => {
      this.languageService.language();
      this.seoService.applyGlobalSeo();
    });
  }

  ngAfterViewInit(): void {
    void this.initializeScrollReveals();
  }

  ngOnDestroy(): void {
    for (const cleanup of this.cleanupCallbacks) {
      cleanup();
    }
  }

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }

  private async initializeScrollReveals(): Promise<void> {
    if (!this.motionPreferences.allowScrollAnimations()) {
      return;
    }

    const root = this.host.nativeElement;
    const cleanup = await this.gsapMotion.createContext(root, ({ gsap }) => {
      const revealSection = (
        sectionSelector: string,
        contentSelector: string,
      ): void => {
        const section = root.querySelector(
          sectionSelector,
        ) as HTMLElement | null;
        if (!section) {
          return;
        }

        const headingItems = section.querySelectorAll(
          '.section-heading__number, .section-heading .eyebrow, .section-heading h2',
        );

        const contentItems = section.querySelectorAll(contentSelector);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            once: true,
          },
          defaults: {
            ease: 'power2.out',
          },
        });

        timeline.from(headingItems, {
          autoAlpha: 0,
          y: 20,
          duration: 0.45,
          stagger: 0.07,
        });

        if (contentItems.length > 0) {
          timeline.from(
            contentItems,
            {
              autoAlpha: 0,
              y: 18,
              duration: 0.42,
              stagger: 0.06,
            },
            '-=0.2',
          );
        }
      };

      revealSection(
        '#about',
        '.about__visual, .about__copy p, .about__stats > div',
      );
      revealSection('#services', '.service-card');
      revealSection('#stack', '.technology-group, .technology-group li');
      revealSection(
        '#experience',
        '.experience-entry__meta, .experience-entry__content, .experience-entry li',
      );
      revealSection('#contact', '.contact__intro, .contact__form');

      const experienceSection = root.querySelector(
        '#experience',
      ) as HTMLElement | null;
      if (experienceSection) {
        const timelineRails = experienceSection.querySelectorAll(
          '.experience-entry__rail',
        ) as NodeListOf<HTMLElement>;
        const timelineNodes = experienceSection.querySelectorAll(
          '.experience-entry__rail > span',
        ) as NodeListOf<HTMLElement>;

        gsap.from(timelineRails, {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: experienceSection,
            start: 'top 74%',
            once: true,
          },
        });

        gsap.from(timelineNodes, {
          autoAlpha: 0,
          scale: 0.7,
          duration: 0.35,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: experienceSection,
            start: 'top 72%',
            once: true,
          },
        });
      }
    });

    this.cleanupCallbacks.push(cleanup);
  }
}
