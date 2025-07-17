import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CssVarService {
  getVariableValue(varName: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }

  setVariableValue(varName: string, value: string) {
    document.documentElement.style.setProperty(varName, value);
  }
}
