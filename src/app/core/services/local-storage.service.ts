import { Injectable } from '@angular/core';

/**
 * Small wrapper around window.localStorage to centralise
 * error handling and JSON (de)serialisation.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  getItem<T>(key: string): T | null {
    if (typeof window === 'undefined') {
      return null;
    }
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        return null;
      }
      return JSON.parse(raw) as T;
    } catch (error) {
      console.error('LocalStorageService.getItem error', { key, error });
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const raw = JSON.stringify(value);
      localStorage.setItem(key, raw);
    } catch (error) {
      console.error('LocalStorageService.setItem error', { key, error });
    }
  }

  removeItem(key: string): void {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(key);
  }
}
