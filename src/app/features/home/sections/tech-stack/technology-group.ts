import { Component, input } from '@angular/core';

import { TechnologyGroup as TechnologyGroupModel } from '../../../../core/models/technology.model';

@Component({
  selector: 'app-technology-group',
  template: `
    <article class="technology-group">
      <div class="technology-group__heading">
        <span aria-hidden="true">{{
          index().toString().padStart(2, '0')
        }}</span>
        <h3>{{ group().label }}</h3>
      </div>
      <ul>
        @for (technology of group().technologies; track technology) {
          <li>{{ technology }}</li>
        }
      </ul>
    </article>
  `,
  styleUrl: './technology-group.scss',
})
export class TechnologyGroup {
  readonly group = input.required<TechnologyGroupModel>();
  readonly index = input.required<number>();
}
