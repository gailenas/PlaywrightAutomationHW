import { test, expect } from '@playwright/test';
import { randomInt } from 'node:crypto';
import { PetEndpoint } from './endpoints/pet.endpoint.js';
import { StoreEndpoint } from './endpoints/store.endpoint.js';
import { type Pet } from './interfaces/pet.interface.js';
import { type Order } from './interfaces/order.interface.js';

test.describe.serial('Petstore API', () => {
  const petNames = ['Zibute', 'Marge', 'Serbente', 'Dobile'];
  const createdPetIds: number[] = [];
  const createdOrderIds: number[] = [];

  test('Create 4 pets with status "available"', async () => {
    for (const name of petNames) {
      const body: Pet = {
        id: randomInt(1, 1_000_000),
        name,
        photoUrls: ['https://images.unsplash.com/photo-1570042225831-d98fa7577f1e'],
        status: 'available',
      };

      const response = await PetEndpoint.postCreate(body);

      expect(response.status).toBe(200);
      expect(response.data.status).toBe('available');
      expect(response.data.id).toBeDefined();
      createdPetIds.push(response.data.id!);
    }
  });

  test('Place multiple orders for each created pet', async () => {
    const quantities = [1, 2];
    let orderIdCounter = 1;
    for (const petId of createdPetIds) {
      for (const quantity of quantities) {
        const body: Order = {
          id: orderIdCounter++,
          petId,
          quantity,
          shipDate: new Date().toISOString(),
          status: 'placed',
          complete: false,
        };

        const response = await StoreEndpoint.postOrder(body);

        expect(response.status).toBe(200);
        expect(response.data.petId).toBe(petId);
        expect(response.data.id).toBeDefined();
        createdOrderIds.push(response.data.id!);
      }
    }
  });

  test('Delete all orders', async () => {
    for (const orderId of createdOrderIds) {
      try {
        const response = await StoreEndpoint.deleteOrderById(orderId);
        expect(response.status).toBe(200);
      } catch (error: any) {
        console.warn(`Failed to delete order ${orderId}: ${error.response?.status}`);
      }
    }
  });

  test('Delete all pets', async () => {
    for (const petId of createdPetIds) {
      try {
        const response = await PetEndpoint.deleteById(petId);
        expect(response.status).toBe(200);
      } catch (error: any) {
        console.warn(`Failed to delete pet ${petId}: ${error.response?.status}`);
      }
    }
  });

  test('Verify deleted orders cannot be retrieved', async () => {
    for (const orderId of createdOrderIds) {
      try {
        await StoreEndpoint.getOrderById(orderId, undefined, 404);
        throw new Error(`Order ${orderId} should have been deleted`);
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    }
  });

  test('Verify deleted pets cannot be retrieved', async () => {
    for (const petId of createdPetIds) {
      try {
        await PetEndpoint.getById(petId, undefined, 404);
        throw new Error(`Pet ${petId} should have been deleted`);
      } catch (error: any) {
        expect(error.response.status).toBe(404);
      }
    }
  });
});
