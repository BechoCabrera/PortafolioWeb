import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslationKey } from '../../../../core/i18n/translations';
import { Project } from '../../../../core/models/project.model';
import { GsapMotionService } from '../../../../core/services/gsap-motion.service';
import { LanguageService } from '../../../../core/services/language.service';
import { MotionPreferencesService } from '../../../../core/services/motion-preferences.service';
import { projects } from '../../../../data/projects.data';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.scss',
})
export class ProjectsSection implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly languageService = inject(LanguageService);
  private readonly motionPreferences = inject(MotionPreferencesService);
  private readonly gsapMotion = inject(GsapMotionService);

  private readonly cleanupCallbacks: Array<() => void> = [];

  protected readonly projects = projects;

  ngAfterViewInit(): void {
    void this.initializeMotion();
  }

  ngOnDestroy(): void {
    for (const cleanup of this.cleanupCallbacks) {
      cleanup();
    }
  }

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }

  protected isReversed(index: number): boolean {
    return index % 2 === 1;
  }

  protected topTechnologies(project: Project): readonly string[] {
    return project.technologies.slice(0, 6);
  }

  private async initializeMotion(): Promise<void> {
    if (!this.motionPreferences.allowScrollAnimations()) {
      return;
    }

    const root = this.host.nativeElement;
    const cleanup = await this.gsapMotion.createContext(root, ({ gsap }) => {
      const cards = root.querySelectorAll('.project-preview') as NodeListOf<HTMLElement>;

      cards.forEach((card: HTMLElement) => {
        const isReversed = card.classList.contains('project-preview--reversed');
        const direction = isReversed ? -24 : 24;

        const number = card.querySelector('.project-preview__number');
        const visual = card.querySelector('.project-preview__visual');
        const category = card.querySelector('.project-preview__category');
        const title = card.querySelector('h3');
        const description = card.querySelector('.project-preview__description');
        const technologies = card.querySelectorAll(
          '.project-preview__stack li',
        );
        const action = card.querySelector('.button');

        const timeline = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: card,
            start: 'top 77%',
            once: true,
          },
        });

        timeline
          .from(number, { autoAlpha: 0, y: 14, duration: 0.25 })
          .from(visual, { autoAlpha: 0, x: direction, duration: 0.5 }, '-=0.15')
          .from(category, { autoAlpha: 0, y: 16, duration: 0.26 }, '-=0.32')
          .from(title, { autoAlpha: 0, y: 16, duration: 0.28 }, '-=0.2')
          .from(description, { autoAlpha: 0, y: 14, duration: 0.24 }, '-=0.16')
          .from(
            technologies,
            { autoAlpha: 0, y: 10, duration: 0.2, stagger: 0.03 },
            '-=0.12',
          )
          .from(action, { autoAlpha: 0, y: 10, duration: 0.2 }, '-=0.12');

        if (visual) {
          gsap.to(visual, {
            y: isReversed ? -10 : 10,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          });
        }
      });
    });

    this.cleanupCallbacks.push(cleanup);
  }
}
