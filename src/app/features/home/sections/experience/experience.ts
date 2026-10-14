import { Component, inject, signal } from '@angular/core';

import { TranslationKey } from '../../../../core/i18n/translations';
import { Experience as ExperienceModel } from '../../../../core/models/experience.model';
import { LanguageService } from '../../../../core/services/language.service';
import { experience } from '../../../../data/experience.data';

const INITIAL_RESPONSIBILITY_COUNT = 5;

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  private readonly languageService = inject(LanguageService);

  protected readonly entries = experience;
  protected readonly expanded = signal(false);

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }

  protected visibleResponsibilities(
    entry: ExperienceModel,
  ): readonly TranslationKey[] {
    return this.expanded()
      ? entry.responsibilityKeys
      : entry.responsibilityKeys.slice(0, INITIAL_RESPONSIBILITY_COUNT);
  }

  protected toggleDetails(): void {
    this.expanded.update((isExpanded) => !isExpanded);
  }
}
