export interface ModalDialog<T = unknown> {
  result: unknown; // Will be cast to OutputEmitterRef<T> at runtime
}
