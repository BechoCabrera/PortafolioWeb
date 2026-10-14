import { services } from './services.data';
import { technologyGroups } from './technologies.data';

describe('Phase 2 content data', () => {
  it('provides the six defined professional services', () => {
    expect(services.length).toBe(6);
    expect(new Set(services.map((service) => service.id)).size).toBe(6);
  });

  it('provides technology groups without proficiency percentages', () => {
    expect(technologyGroups.map((group) => group.id)).toEqual([
      'backend',
      'frontend',
      'database',
      'architecture',
      'devops',
    ]);
    expect(
      technologyGroups
        .flatMap((group) => group.technologies)
        .some((technology) => technology.includes('%')),
    ).toBeFalse();
  });
});
