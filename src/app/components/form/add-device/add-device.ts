import { Component, output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllDevices } from '~/app/state/device.selectors';
import type { DeviceItem, SensorItem } from '~/api/api.types';
import { Icon } from '~/app/components/icon/icon';

export type TAddDeviceResult = { item: DeviceItem | SensorItem } | undefined

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
    if (id) {
      const item = this.devices().find(el => el.id === id)
      if (item) {
        this.result.emit({ item })
        return
      }
    }
    this.result.emit(undefined);
  }

  protected onCancel() {
    this.result.emit(undefined);
  }
}
