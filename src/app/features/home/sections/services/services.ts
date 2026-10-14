import { Component, inject } from '@angular/core';
import {
  LucideBraces,
  LucideBuilding2,
  LucideCloudOff,
  LucideDatabase,
  LucidePanelsTopLeft,
  LucideRefreshCw,
} from '@lucide/angular';

import { TranslationKey } from '../../../../core/i18n/translations';
import { LanguageService } from '../../../../core/services/language.service';
import { services } from '../../../../data/services.data';

@Component({
  selector: 'app-services',
  imports: [
    LucidePanelsTopLeft,
    LucideBraces,
    LucideBuilding2,
    LucideCloudOff,
    LucideDatabase,
    LucideRefreshCw,
  ],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private readonly languageService = inject(LanguageService);

  protected readonly services = services;

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }
}
