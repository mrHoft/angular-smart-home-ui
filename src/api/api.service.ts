import { APIData } from "./api.types"
import data from './mock-data.json' with { type: 'json' };

class Api {
  private data: APIData

  constructor() {
    this.data = data as APIData
  }

  public getTabs() {
    return this.data.tabs
  }
}

const api = new Api()
export { api }
