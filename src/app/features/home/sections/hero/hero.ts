import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';

import { TranslationKey } from '../../../../core/i18n/translations';
import { GsapMotionService } from '../../../../core/services/gsap-motion.service';
import { LanguageService } from '../../../../core/services/language.service';
import { MotionPreferencesService } from '../../../../core/services/motion-preferences.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef) as ElementRef<HTMLElement>;
  private readonly languageService = inject(LanguageService);
  private readonly motionPreferences = inject(MotionPreferencesService);
  private readonly gsapMotion = inject(GsapMotionService);

  private readonly cleanupCallbacks: Array<() => void> = [];

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

  private async initializeMotion(): Promise<void> {
    const root = this.host.nativeElement;

    if (this.motionPreferences.allowScrollAnimations()) {
      const cleanupHeroIntro = await this.gsapMotion.createContext(
        root,
        ({ gsap }) => {
          const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

          timeline
            .from('[data-hero="status"]', {
              autoAlpha: 0,
              y: 14,
              duration: 0.22,
            })
            .from(
              '[data-hero="eyebrow"]',
              { autoAlpha: 0, y: 14, duration: 0.18 },
              '<0.02',
            )
            .from(
              '[data-hero="title-line-1"]',
              { autoAlpha: 0, y: 24, duration: 0.24 },
              '<0.04',
            )
            .from(
              '[data-hero="title-line-2"]',
              { autoAlpha: 0, x: 20, duration: 0.24 },
              '<0.05',
            )
            .from(
              '[data-hero="role"]',
              { autoAlpha: 0, y: 14, duration: 0.2 },
              '<0.05',
            )
            .from(
              '[data-hero="intro"]',
              { autoAlpha: 0, y: 12, duration: 0.2 },
              '<0.04',
            )
            .from(
              '[data-hero="technologies"] li',
              { autoAlpha: 0, y: 10, stagger: 0.03, duration: 0.14 },
              '<0.02',
            )
            .from(
              '[data-hero="actions"] > *',
              { autoAlpha: 0, y: 10, stagger: 0.06, duration: 0.18 },
              '<0.02',
            )
            .from(
              '[data-hero="visual"]',
              { autoAlpha: 0, x: 18, scale: 0.985, duration: 0.36 },
              '<0.04',
            );
        },
      );

      this.cleanupCallbacks.push(cleanupHeroIntro);
    }

    if (this.motionPreferences.allowPointerEffects()) {
      const cleanupParallax = await this.gsapMotion.createContext(
        root,
        ({ gsap }) => {
          const hero = root.querySelector('.hero') as HTMLElement | null;
          if (!hero) {
            return;
          }

          const layers = Array.from(
            root.querySelectorAll('[data-parallax-depth]'),
          )
            .map((element) => {
              if (!(element instanceof HTMLElement)) {
                return null;
              }

              const depth = Number(element.dataset['parallaxDepth'] ?? '0');
              if (!Number.isFinite(depth) || depth <= 0) {
                return null;
              }

              return {
                depth,
                element,
                moveX: gsap.quickTo(element, 'x', {
                  duration: 0.8,
                  ease: 'power3.out',
                }),
                moveY: gsap.quickTo(element, 'y', {
                  duration: 0.8,
                  ease: 'power3.out',
                }),
              };
            })
            .filter(
              (layer): layer is NonNullable<typeof layer> => layer !== null,
            );

          if (layers.length === 0) {
            return;
          }

          const handleMove = (event: MouseEvent) => {
            const bounds = hero.getBoundingClientRect();
            const relativeX =
              (event.clientX - bounds.left) / bounds.width - 0.5;
            const relativeY =
              (event.clientY - bounds.top) / bounds.height - 0.5;

            for (const layer of layers) {
              const isPortraitLayer = layer.element.classList.contains(
                'hero__portrait-frame',
              );
              const yFactor = isPortraitLayer ? 0.18 : 0.35;

              layer.moveX(relativeX * layer.depth * 2);
              layer.moveY(relativeY * layer.depth * yFactor);
            }
          };

          const handleLeave = () => {
            for (const layer of layers) {
              layer.moveX(0);
              layer.moveY(0);
            }
          };

          hero.addEventListener('mousemove', handleMove, { passive: true });
          hero.addEventListener('mouseleave', handleLeave);

          this.cleanupCallbacks.push(() => {
            hero.removeEventListener('mousemove', handleMove);
            hero.removeEventListener('mouseleave', handleLeave);
          });
        },
      );

      this.cleanupCallbacks.push(cleanupParallax);
    }
  }

  protected hideUnavailableImage(event: Event): void {
    const image = event.target;
    if (image instanceof HTMLImageElement) {
      image.hidden = true;
    }
  }
}
