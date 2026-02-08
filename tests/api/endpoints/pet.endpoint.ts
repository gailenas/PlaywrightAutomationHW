import { type AxiosRequestHeaders, type AxiosResponse } from 'axios';
import axios from '../api-client.js';
import { type Pet } from '../interfaces/pet.interface.js';

export class PetEndpoint {
  static async create(
    body: Pet,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<Pet>> {
    return axios.post('/pet', body, { headers });
  }

  static async getById(
    petId: number,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse<Pet>> {
    return axios.get(`/pet/${petId}`, { headers });
  }

  static async delete(
    petId: number,
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse> {
    return axios.delete(`/pet/${petId}`, { headers });
  }
}
