import { Component, inject } from '@angular/core';

import { TranslationKey } from '../../../../core/i18n/translations';
import { LanguageService } from '../../../../core/services/language.service';
import { technologyGroups } from '../../../../data/technologies.data';
import { TechnologyGroup } from './technology-group';

@Component({
  selector: 'app-tech-stack',
  imports: [TechnologyGroup],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.scss',
})
export class TechStack {
  private readonly languageService = inject(LanguageService);

  protected readonly technologyGroups = technologyGroups;

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }
}
