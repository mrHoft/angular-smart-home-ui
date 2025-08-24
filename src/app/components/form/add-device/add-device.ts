import { Component, output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllDevices } from '~/app/state/device.selectors';
import type { DeviceItem, SensorItem } from '~/api/api.types';
import { Icon } from '~/app/components/icon/icon';

export type TAddDeviceResult = { item: DeviceItem | SensorItem } | null

@Component({
  selector: 'app-add-device',
  imports: [Icon],
  templateUrl: './add-device.html',
  styleUrl: './add-device.scss'
})
export class AddDevice {
  private store = inject(Store);
  public result = output<TAddDeviceResult>()
  protected devices = this.store.selectSignal(selectAllDevices);

  protected onSubmit(event: Event) {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const id = formData.get('device')?.toString()
    if (!id) {
      return this.result.emit(null);
    }

    const item = this.devices().find(el => el.id === id)
    if (item) {
      return this.result.emit({ item })
    }
  }

  protected onCancel() {
    this.result.emit(null);
  }
}
