export type TLayout = "horizontalLayout" | "verticalLayout" | 'singleDevice'
// type TIconView = "thermostat" | "water_drop" | "cloud" | "co2" | "motion_photos_on" | "lightbulb" | 'power'

export type CardItem = DeviceItem | SensorItem;

export interface DeviceItem {
  type: "device";
  icon: string;
  label: string;
  state: boolean;
}

export interface SensorItem {
  type: "sensor";
  icon: string;
  label: string;
  value: {
    amount: number;
    unit: string;
  };
}

export interface CardData {
  id: string,
  title: string,
  layout: TLayout,
  items: CardItem[]
}

export interface DashboardItem { id: string, title: string, icon: string }

export interface TabData {
  id: string,
  title: string,
  cards: CardData[]
}
