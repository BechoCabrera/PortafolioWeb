import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  viewChild,
} from '@angular/core';

import { MotionPreferencesService } from '../../core/services/motion-preferences.service';

@Component({
  selector: 'app-ambient-background',
  standalone: true,
  templateUrl: './ambient-background.html',
  styleUrl: './ambient-background.scss',
})
export class AmbientBackgroundComponent implements AfterViewInit, OnDestroy {
  private readonly motionPreferences = inject(MotionPreferencesService);

  private readonly hostRef =
    viewChild.required<ElementRef<HTMLElement>>('ambientHost');

  protected readonly pointerEnabled =
    this.motionPreferences.allowPointerEffects();

  private animationFrameId: number | null = null;
  private pointerListener: ((event: PointerEvent) => void) | null = null;

  private currentX = 0;
  private currentY = 0;
  private targetX = 0;
  private targetY = 0;

  ngAfterViewInit(): void {
    if (!this.pointerEnabled) {
      return;
    }

    const host = this.hostRef().nativeElement;

    this.targetX = window.innerWidth * 0.5;
    this.targetY = window.innerHeight * 0.35;
    this.currentX = this.targetX;
    this.currentY = this.targetY;

    this.pointerListener = (event: PointerEvent) => {
      this.targetX = event.clientX;
      this.targetY = event.clientY;
    };

    window.addEventListener('pointermove', this.pointerListener, {
      passive: true,
    });

    const loop = () => {
      this.currentX += (this.targetX - this.currentX) * 0.08;
      this.currentY += (this.targetY - this.currentY) * 0.08;

      host.style.setProperty('--mouse-x', `${this.currentX}px`);
      host.style.setProperty('--mouse-y', `${this.currentY}px`);

      this.animationFrameId = window.requestAnimationFrame(loop);
    };

    this.animationFrameId = window.requestAnimationFrame(loop);
  }

  ngOnDestroy(): void {
    if (this.pointerListener) {
      window.removeEventListener('pointermove', this.pointerListener);
    }

    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }
}
