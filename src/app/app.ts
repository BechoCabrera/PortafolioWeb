import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TranslationKey } from './core/i18n/translations';
import { LanguageService } from './core/services/language.service';
import { AmbientBackgroundComponent } from './layout/ambient-background/ambient-background';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AmbientBackgroundComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly languageService = inject(LanguageService);

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }
}
