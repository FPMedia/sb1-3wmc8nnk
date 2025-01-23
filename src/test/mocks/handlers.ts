import { http, HttpResponse } from 'msw';
import { Design, OrderWithItems } from '../../types';

const mockDesign: Design = {
  id: '1',
  title: 'Test Design',
  description: 'A test design',
  price: 350.00,
  image_url: 'https://example.com/test.jpg',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  created_by: 'test-user'
};

const mockOrder: OrderWithItems = {
  id: '1',
  customer_id: 'test-customer',
  total_amount: 350.00,
  status: 'pending',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  order_items: [{
    id: '1',
    order_id: '1',
    design_id: '1',
    quantity: 1,
    price: 350.00,
    color: 'white',
    size: 'M',
    created_at: new Date().toISOString(),
    design: mockDesign
  }]
};

export const handlers = [
  // Mock designs endpoint
  http.get('*/rest/v1/designs', () => {
    return HttpResponse.json([mockDesign]);
  }),

  http.get('*/rest/v1/designs?id=eq.1', () => {
    return HttpResponse.json([mockDesign]);
  }),

  // Mock customer endpoints
  http.get('*/rest/v1/customers', () => {
    return HttpResponse.json([{ id: 'test-customer', phone: '+27721234567' }]);
  }),

  http.post('*/rest/v1/customers', () => {
    return HttpResponse.json({ id: 'test-customer', phone: '+27721234567' });
  }),

  // Mock orders endpoints
  http.post('*/rest/v1/orders', () => {
    return HttpResponse.json({ id: '1', customer_id: 'test-customer' });
  }),

  http.post('*/rest/v1/order_items', () => {
    return HttpResponse.json({ success: true });
  }),

  http.get('*/rest/v1/orders', () => {
    return HttpResponse.json([mockOrder]);
  })
];