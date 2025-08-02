import { TabData } from "../api.types"
import data from './mock-data.json' with { type: 'json' };

class Api {
  private data: TabData[]

  constructor() {
    this.data = data.tabs as TabData[]
  }

  public getDashboards() {
    return []
  }

  public getTabs() {
    return this.data
  }
}

const api = new Api()
export { api }
