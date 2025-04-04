import { describe, it, expect } from 'vitest';
import { findProductBySku, calculateItemPrice, calculateBasketTotal } from './calculations';

const mockProducts = [
    { sku: 'A123', unitPrice: 50, specialPrice: { quantity: 3, price: 130 } },
    { sku: 'B456', unitPrice: 30, specialPrice: { quantity: 2, price: 45 } },
    { sku: 'C789', unitPrice: 20 },
];

describe('findProductBySku', () => {
    it('should return the product matching the SKU', () => {
        expect(findProductBySku('A123', mockProducts)).toEqual(mockProducts[0]);
    });

    it('should return undefined if no product matches the SKU', () => {
        expect(findProductBySku('Z999', mockProducts)).toBeUndefined();
    });

    it('should handle case-insensitive SKU matching', () => {
        expect(findProductBySku('a123', mockProducts)).toEqual(mockProducts[0]);
    });
});

describe('calculateItemPrice', () => {
    it('should calculate price without special pricing', () => {
        const product = mockProducts[2];
        expect(calculateItemPrice(product, 5)).toBe(100);
    });

    it('should calculate price with special pricing applied', () => {
        const product = mockProducts[0];
        expect(calculateItemPrice(product, 3)).toBe(130);
    });

    it('should calculate price with special pricing and remaining items', () => {
        const product = mockProducts[0];
        expect(calculateItemPrice(product, 4)).toBe(180);
    });

    it('should return 0 if product is undefined', () => {
        expect(calculateItemPrice(undefined as any, 5)).toBe(0);
    });
});

describe('calculateBasketTotal', () => {
    const basketItems = [
        { sku: 'A123', quantity: 4 },
        { sku: 'B456', quantity: 2 },
        { sku: 'C789', quantity: 1 },
    ];

    it('should calculate the total price of the basket', () => {
        expect(calculateBasketTotal(basketItems, mockProducts)).toBe(245);
    });

    it('should skip items with invalid SKUs', () => {
        const invalidBasket = [...basketItems, { sku: 'Z999', quantity: 1 }];
        expect(calculateBasketTotal(invalidBasket, mockProducts)).toBe(245);
    });

    it('should return 0 for an empty basket', () => {
        expect(calculateBasketTotal([], mockProducts)).toBe(0);
    });
});
