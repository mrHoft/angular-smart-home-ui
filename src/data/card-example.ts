import type { TLayout, CardData } from "~/api/api.types"

export const cardExamples: Record<TLayout, CardData> = {
  verticalLayout: {
    "id": "example-vertical-layout",
    "title": "Vertical layout",
    "layout": "verticalLayout",
    "items": [
      {
        "id": "example_1",
        "type": "sensor",
        "icon": "thermostat",
        "label": "Temperature",
        "value": {
          "amount": 23.5,
          "unit": "°C"
        }
      },
      {
        "id": "example_2",
        "type": "sensor",
        "icon": "cloud",
        "label": "Weather",
        "value": {
          "amount": 1,
          "unit": "clear"
        }
      }
    ]
  },
  horizontalLayout: {
    "id": "example-horizontal-layout",
    "title": "Horizontal layout",
    "layout": "horizontalLayout",
    "items": [
      {
        "id": "example_1",
        "type": "sensor",
        "icon": "thermostat",
        "label": "Temperature",
        "value": {
          "amount": 18.5,
          "unit": "°C"
        }
      },
      {
        "id": "example_2",
        "type": "sensor",
        "icon": "water_drop",
        "label": "Humidity",
        "value": {
          "amount": 72,
          "unit": "%"
        }
      },
      {
        "id": "example_3",
        "type": "sensor",
        "icon": "cloud",
        "label": "Weather",
        "value": {
          "amount": 1,
          "unit": "clear"
        }
      }
    ]
  },
  singleDevice: {
    "id": "example-single-device",
    "title": "Single device",
    "layout": "singleDevice",
    "items": [
      {
        "id": "example_1",
        "type": "device",
        "icon": "motion_photos_on",
        "label": "Motion Sensor",
        "state": false
      }
    ]
  }
}
