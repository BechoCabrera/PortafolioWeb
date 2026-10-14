import { Injectable } from '@angular/core';

export interface ContactFormPayload {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly recipientEmail = 'ingmanuelcs@gmail.com';
  // Optional: set this to your Cloudflare Worker/API endpoint to send emails server-side.
  private readonly submitEndpoint = '';

  buildMailtoUrl(payload: ContactFormPayload): string {
    const cleanName = payload.name.trim();
    const cleanEmail = payload.email.trim();
    const cleanMessage = payload.message.trim();

    const subject = `Portfolio contact from ${cleanName}`;
    const body = [
      `Name: ${cleanName}`,
      `Email: ${cleanEmail}`,
      '',
      'Message:',
      cleanMessage,
    ].join('\n');

    const params = new URLSearchParams({
      subject,
      body,
    });

    return `mailto:${this.recipientEmail}?${params.toString()}`;
  }

  submitViaMailClient(payload: ContactFormPayload): void {
    const mailtoUrl = this.buildMailtoUrl(payload);
    window.location.href = mailtoUrl;
  }

  async submitToApi(payload: ContactFormPayload): Promise<boolean> {
    if (!this.submitEndpoint) {
      return false;
    }

    try {
      const response = await fetch(this.submitEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}
