import {
  Injectable,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class MotionPreferencesService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly reducedMotion = signal(false);
  readonly desktopPointer = signal(false);

  private readonly cleanupCallbacks: Array<() => void> = [];

  constructor() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const reducedMotionMql = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    const pointerMql = window.matchMedia('(hover: hover) and (pointer: fine)');

    const sync = () => {
      this.reducedMotion.set(reducedMotionMql.matches);
      this.desktopPointer.set(pointerMql.matches && window.innerWidth >= 1024);
    };

    const handleChange = () => sync();
    sync();

    reducedMotionMql.addEventListener('change', handleChange);
    pointerMql.addEventListener('change', handleChange);
    window.addEventListener('resize', handleChange, { passive: true });

    this.cleanupCallbacks.push(() => {
      reducedMotionMql.removeEventListener('change', handleChange);
      pointerMql.removeEventListener('change', handleChange);
      window.removeEventListener('resize', handleChange);
    });
  }

  allowScrollAnimations(): boolean {
    return !this.reducedMotion();
  }

  allowPointerEffects(): boolean {
    return !this.reducedMotion() && this.desktopPointer();
  }

  ngOnDestroy(): void {
    for (const cleanup of this.cleanupCallbacks) {
      cleanup();
    }
  }
}
