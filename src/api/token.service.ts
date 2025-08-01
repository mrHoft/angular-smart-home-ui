import { Injectable } from '@angular/core';

const APP_NAME = 'app-smart-home';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private storageKey = APP_NAME;

  public get(): string | null {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return null;
      const parsed = JSON.parse(data);
      return typeof parsed === 'object' && parsed !== null ? parsed['auth_token'] || null : null;
    } catch {
      return null;
    }
  }

  public set(token: string) {
    try {
      const current = this.getStoredObject();
      current['auth_token'] = token;
      localStorage.setItem(this.storageKey, JSON.stringify(current));
    } catch {
      // Ignore write errors
    }
  }

  public remove() {
    try {
      const current = this.getStoredObject();
      delete current['auth_token'];
      localStorage.setItem(this.storageKey, JSON.stringify(current));
    } catch {
      // Ignore write errors
    }
  }

  private getStoredObject(): Record<string, unknown> {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }
}
