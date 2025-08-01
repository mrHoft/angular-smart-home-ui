import { Injectable, inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ScreenSizeService {
  private breakpointObserver = inject(BreakpointObserver);

  public readonly isWideScreen = toSignal(
    this.breakpointObserver.observe('(min-width: 741px)').pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );
}
