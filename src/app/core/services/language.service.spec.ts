import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('switches every translated label to Spanish', () => {
    service.setLanguage('es');

    expect(service.language()).toBe('es');
    expect(service.translate('section.about')).toBe('Sobre mí');
    expect(service.translate('experience.fise.period')).toContain('Actualidad');
  });

  it('switches every translated label to English', () => {
    service.setLanguage('en');

    expect(service.language()).toBe('en');
    expect(service.translate('section.about')).toBe('About me');
    expect(service.translate('experience.fise.period')).toContain('Present');
  });
});
