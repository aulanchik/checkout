import { describe, it, expect } from 'vitest';
import formatPrice from './formatters';

describe('formatPrice', () => {
    it('should format price correctly for whole pounds', () => {
        expect(formatPrice(500)).toBe('£5.00');
    });

    it('should format price correctly for pounds and pence', () => {
        expect(formatPrice(1234)).toBe('£12.34');
    });

    it('should format price correctly for less than one pound', () => {
        expect(formatPrice(45)).toBe('£0.45');
    });

    it('should format price correctly for zero', () => {
        expect(formatPrice(0)).toBe('£0.00');
    });

    it('should handle single-digit pence correctly', () => {
        expect(formatPrice(1001)).toBe('£10.01');
    });
});
