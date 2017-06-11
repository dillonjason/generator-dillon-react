import {Request} from './request'

const prefix = '<%= baseRoute %>/api'
const request = new Request()

export class Api {
  static async getMockData () {
    const res = await request.get(`${prefix}/mockData`)
    return res.json()
  }
}
