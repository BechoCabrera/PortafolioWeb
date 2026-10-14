import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  computed,
  effect,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { TranslationKey } from '../../../core/i18n/translations';
import { GsapMotionService } from '../../../core/services/gsap-motion.service';
import { LanguageService } from '../../../core/services/language.service';
import { MotionPreferencesService } from '../../../core/services/motion-preferences.service';
import { SeoService } from '../../../core/services/seo.service';
import { getProjectBySlug } from '../../../data/projects.data';
import { ProjectArchitectureComponent } from '../components/project-architecture/project-architecture';
import { ProjectMediaViewerComponent } from '../components/project-media-viewer/project-media-viewer';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    RouterLink,
    ProjectArchitectureComponent,
    ProjectMediaViewerComponent,
  ],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly route = inject(ActivatedRoute);
  private readonly languageService = inject(LanguageService);
  private readonly motionPreferences = inject(MotionPreferencesService);
  private readonly gsapMotion = inject(GsapMotionService);
  private readonly seoService = inject(SeoService);

  private readonly cleanupCallbacks: Array<() => void> = [];

  protected readonly project = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    return getProjectBySlug(slug);
  });

  constructor() {
    effect(() => {
      this.languageService.language();
      const currentProject = this.project();

      if (!currentProject) {
        this.seoService.applyGlobalSeo();
        return;
      }

      this.seoService.applyProjectSeo(
        currentProject.name,
        currentProject.shortDescriptionKey,
        currentProject.slug,
      );
    });
  }

  ngAfterViewInit(): void {
    void this.initializeMotion();
  }

  ngOnDestroy(): void {
    for (const cleanup of this.cleanupCallbacks) {
      cleanup();
    }

    this.seoService.applyGlobalSeo();
  }

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }

  private async initializeMotion(): Promise<void> {
    if (!this.motionPreferences.allowScrollAnimations()) {
      return;
    }

    const root = this.host.nativeElement;
    const cleanup = await this.gsapMotion.createContext(root, ({ gsap }) => {
      const detailRoot = root.querySelector(
        '.project-detail',
      ) as HTMLElement | null;
      if (!detailRoot) {
        return;
      }

      gsap.from(detailRoot, {
        autoAlpha: 0,
        y: 14,
        duration: 0.45,
        ease: 'power2.out',
      });

      const sections = detailRoot.querySelectorAll(
        '.project-block, .project-grid, .project-media, .project-cta',
      ) as NodeListOf<HTMLElement>;

      sections.forEach((section: HTMLElement) => {
        gsap.from(section, {
          autoAlpha: 0,
          y: 18,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        });
      });

      const architectureSection = detailRoot.querySelector(
        '.project-block--architecture',
      ) as HTMLElement | null;
      if (architectureSection) {
        const nodes =
          architectureSection.querySelectorAll('.architecture-node');
        const links =
          architectureSection.querySelectorAll('.architecture-link');

        const architectureTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: architectureSection,
            start: 'top 78%',
            once: true,
          },
        });

        architectureTimeline.from(nodes, {
          autoAlpha: 0,
          y: 12,
          duration: 0.35,
          stagger: 0.06,
          ease: 'power2.out',
        });

        architectureTimeline.from(
          links,
          {
            autoAlpha: 0,
            duration: 0.25,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.12',
        );
      }
    });

    this.cleanupCallbacks.push(cleanup);
  }
}
