import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenSizeService {
  private isWideScreenSubject = new BehaviorSubject<boolean>(false);
  private mediaQuery = globalThis.matchMedia('(min-width: 741px)');
  private isWideScreen = this.isWideScreenSubject.asObservable();

  constructor() {
    this.isWideScreenSubject.next(this.mediaQuery.matches);

    this.mediaQuery.addEventListener('change', this.callback);
  }

  private callback = (e: MediaQueryListEvent) => {
    this.isWideScreenSubject.next(e.matches)
  }

  public subscribe = (callback: (_isWide: boolean) => void) => {
    this.isWideScreen.subscribe(callback)
  }

  public unsubscribe = () => {
    this.mediaQuery.removeEventListener('change', this.callback)
  }
}
