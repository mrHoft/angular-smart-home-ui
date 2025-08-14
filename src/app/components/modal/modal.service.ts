import { Injectable, ComponentRef, Injector, Type, signal, ViewContainerRef, effect, runInInjectionContext } from '@angular/core';
import { ModalDialog } from './modal-dialog';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private componentRef: ComponentRef<any> | null = null;
  private hostViewContainerRef: ViewContainerRef | null = null;
  public readonly isVisible = signal(false);

  public showComponent<T>(component: Type<ModalDialog<T>>, injector?: Injector): Promise<T> {
    this.clear();
    if (!this.hostViewContainerRef) {
      throw new Error('Modal host view container is not set.');
    }

    const mergedInjector = Injector.create({
      providers: [],
      parent: injector ?? this.hostViewContainerRef.injector,
    });

    this.componentRef = this.hostViewContainerRef.createComponent(component, {
      injector: mergedInjector,
    });

    this.isVisible.set(true);

    return new Promise<T>((resolve) => {
      const outputSub = this.componentRef!.instance.result.subscribe((result: T) => {
        outputSub.unsubscribe();
        this.close();
        resolve(result);
      });

      const destroyEffect = runInInjectionContext(mergedInjector, () => {
        return effect(() => {
          if (!this.isVisible()) {
            destroyEffect.destroy();
            outputSub.unsubscribe();
            resolve(undefined as T);
          }
        });
      });
    });
  }

  public close(): void {
    this.clear();
    this.isVisible.set(false);
  }

  public clear(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this.hostViewContainerRef?.clear();
  }

  public setHostViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this.hostViewContainerRef = viewContainerRef;
  }
}
