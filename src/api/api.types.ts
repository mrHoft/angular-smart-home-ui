type TLayout = "horizontalLayout" | "verticalLayout"
type TIconView = "thermostat" | "water_drop" | "cloud" | "co2" | "motion_photos_on" | "lightbulb"

export interface CardItemData {
  type: string,
  icon: TIconView,
  label: string,
  value?: {
    amount: number,
    unit: string
  }
  state?: boolean
}

export interface CardData {
  id: string,
  title: string,
  layout: TLayout,
  items: CardItemData[]
}


export interface TabData {
  id: string,
  title: string,
  cards: CardData[]
}

export interface APIData {
  tabs: TabData[]
}
