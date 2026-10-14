import { Component, HostListener, inject, signal } from '@angular/core';

import { navigationItems } from '../../core/constants/navigation.constants';
import { TranslationKey } from '../../core/i18n/translations';
import { Language } from '../../core/models/language.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly languageService = inject(LanguageService);
  protected readonly navigationItems = navigationItems;
  protected readonly menuOpen = signal(false);
  protected readonly isScrolled = signal(false);

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 24);
  }

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }

  protected setLanguage(language: Language): void {
    this.languageService.setLanguage(language);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
