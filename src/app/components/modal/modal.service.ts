import { Injectable, ComponentRef, Injector, Type, signal, ViewContainerRef, effect, runInInjectionContext } from '@angular/core';

export interface ModalDialog<T = unknown, P = Record<string, string>> {
  result: unknown; // Will be cast to OutputEmitterRef<T> at runtime
  inputs?: P; // Input properties for the modal component
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  private componentRef: ComponentRef<any> | null = null;
  private hostViewContainerRef: ViewContainerRef | null = null;
  public readonly isVisible = signal(false);

  public showComponent<T, P>(component: Type<ModalDialog<T, P>>, props?: P, injector?: Injector): Promise<T> {
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

    if (props && this.componentRef.instance) {
      Object.entries(props).forEach(([key, value]) => {
        const instance = this.componentRef!.instance as Record<string, unknown>;
        if (key in instance) {
          instance[key] = value;
        }
      });
    }

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
