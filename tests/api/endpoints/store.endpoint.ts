import { type AxiosRequestHeaders, type AxiosResponse } from 'axios';
import axios from '../api-client.js';
import { type Order } from '../interfaces/order.interface.js';

export class StoreEndpoint {
  static async postOrder(
    body: Order,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<Order>> {
    return axios.post('/store/order', body, { headers });
  }

  static async getOrderById(
    orderId: number,
    headers?: AxiosRequestHeaders,
    expectedStatus?: number,
  ): Promise<AxiosResponse<Order>> {
    return axios.get(`/store/order/${orderId}`, { headers, expectedStatus });
  }

  static async deleteOrderById(
    orderId: number,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse> {
    return axios.delete(`/store/order/${orderId}`, { headers });
  }
}
