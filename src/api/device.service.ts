import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { SensorItem, DeviceItem } from './api.types';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private http = inject(HttpClient);

  public requestDevices() {
    return this.http.get<(SensorItem | DeviceItem)[]>('/devices');
  }

  public requestDeviceToggle(id: string, state: boolean) {
    return this.http.patch<DeviceItem>(`/devices/${id}`, { state });
  }
}
