import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenMonitorService {
  private isWideScreenSubject = new BehaviorSubject<boolean>(false);
  public isWideScreen = this.isWideScreenSubject.asObservable();

  constructor() {
    const mediaQuery = globalThis.matchMedia('(min-width: 741px)');
    this.isWideScreenSubject.next(mediaQuery.matches);

    mediaQuery.addEventListener('change', (e) => {
      this.isWideScreenSubject.next(e.matches);
    });
  }
}
