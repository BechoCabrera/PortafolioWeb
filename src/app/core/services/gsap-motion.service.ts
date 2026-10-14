import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { MotionPreferencesService } from './motion-preferences.service';

type GsapNamespace = typeof import('gsap');
type ScrollTriggerNamespace = typeof import('gsap/ScrollTrigger');

type GsapInstance = GsapNamespace['gsap'];
type ScrollTriggerInstance = ScrollTriggerNamespace['ScrollTrigger'];

interface LoadedGsap {
  readonly gsap: GsapInstance;
  readonly ScrollTrigger: ScrollTriggerInstance;
}

@Injectable({ providedIn: 'root' })
export class GsapMotionService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly motionPreferences = inject(MotionPreferencesService);

  private libraryPromise: Promise<LoadedGsap> | null = null;

  async createContext(
    scope: Element,
    setup: (libraries: LoadedGsap) => void,
  ): Promise<() => void> {
    if (!isPlatformBrowser(this.platformId)) {
      return () => undefined;
    }

    const libraries = await this.loadLibraries();
    const context = libraries.gsap.context(() => setup(libraries), scope);

    return () => context.revert();
  }

  shouldReduceMotion(): boolean {
    return !this.motionPreferences.allowScrollAnimations();
  }

  canUsePointerEffects(): boolean {
    return this.motionPreferences.allowPointerEffects();
  }

  private async loadLibraries(): Promise<LoadedGsap> {
    if (this.libraryPromise) {
      return this.libraryPromise;
    }

    this.libraryPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    });

    return this.libraryPromise;
  }
}
