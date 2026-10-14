import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TranslationKey } from '../../../../core/i18n/translations';
import { ContactService } from '../../../../core/services/contact.service';
import { LanguageService } from '../../../../core/services/language.service';

interface ContactFormModel {
  readonly name: FormControl<string>;
  readonly email: FormControl<string>;
  readonly message: FormControl<string>;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly languageService = inject(LanguageService);
  private readonly contactService = inject(ContactService);
  protected readonly whatsappLink =
    'https://wa.me/573166034064?text=Hola%20Manuel%2C%20quiero%20comunicarme%20contigo.';

  // Hidden until the CV file is intentionally added to public/assets/documents.
  protected readonly hasCvFile = signal(false);

  protected readonly form = new FormGroup<ContactFormModel>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    message: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected t(key: TranslationKey): string {
    return this.languageService.translate(key);
  }

  protected async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    const sent = await this.contactService.submitToApi(payload);

    if (!sent) {
      this.contactService.submitViaMailClient(payload);
    }
  }

  protected isInvalid(controlName: keyof ContactFormModel): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }
}
