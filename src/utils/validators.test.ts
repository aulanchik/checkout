import { describe, it, expect } from 'vitest';
import {
    validateNonEmpty,
    validatePositiveInteger,
    validateNotZero,
    validateMinValue,
    validateSpecialFields,
    validateField,
} from '@/utils/validators';

describe('validateNonEmpty', () => {
    it('should return an error message if value is empty', () => {
        expect(validateNonEmpty('')).toBe('This field cannot be empty');
    });

    it('should return null if value is not empty', () => {
        expect(validateNonEmpty(5)).toBeNull();
    });
});

describe('validatePositiveInteger', () => {
    it('should return null if value is empty', () => {
        expect(validatePositiveInteger('')).toBeNull();
    });

    it('should return an error message if value is negative', () => {
        expect(validatePositiveInteger(-1)).toBe('Value must be a positive number');
    });

    it('should return an error message if value is not an integer', () => {
        expect(validatePositiveInteger(1.5)).toBe('Value must be a whole number');
    });

    it('should return null if value is a positive integer', () => {
        expect(validatePositiveInteger(3)).toBeNull();
    });
});

describe('validateNotZero', () => {
    it('should return an error message if value is zero', () => {
        expect(validateNotZero(0, 'Test Field')).toBe('Test Field cannot be zero');
    });

    it('should return null if value is not zero', () => {
        expect(validateNotZero(5, 'Test Field')).toBeNull();
    });
});

describe('validateMinValue', () => {
    it('should return an error message if value is less than the minimum', () => {
        expect(validateMinValue(3, 'Test Field', 5)).toBe('Test Field must be at least 5');
    });

    it('should return null if value meets the minimum', () => {
        expect(validateMinValue(5, 'Test Field', 5)).toBeNull();
    });

    it('should return null if value is empty', () => {
        expect(validateMinValue('', 'Test Field', 5)).toBeNull();
    });
});

describe('validateSpecialFields', () => {
    it('should return null if both specialQuantity and specialPrice are empty', () => {
        expect(validateSpecialFields('', '')).toBeNull();
    });

    it('should return an error message if specialQuantity is provided but specialPrice is empty', () => {
        expect(validateSpecialFields(5, '')).toBe('Special Price must be specified if Special Quantity is provided');
    });

    it('should return an error message if specialPrice is provided but specialQuantity is empty', () => {
        expect(validateSpecialFields('', 10)).toBe('Special Quantity must be specified if Special Price is provided');
    });

    it('should return null if both specialQuantity and specialPrice are provided', () => {
        expect(validateSpecialFields(5, 10)).toBeNull();
    });
});

describe('validateField', () => {
    it('should return error message if value is empty and required', () => {
        expect(validateField('', 'Test Field', true)).toBe('Test Field is required');
    });

    it('should return null if value is empty but not required', () => {
        expect(validateField('', 'Test Field')).toBeNull();
    });

    it('should return an error message if value is zero', () => {
        expect(validateField(0, 'Test Field')).toBe('Test Field cannot be zero');
    });

    it('should return an error message if value is negative', () => {
        expect(validateField(-1, 'Test Field')).toBe('Test Field must be a positive number');
    });

    it('should return an error message if value is not an integer', () => {
        expect(validateField(1.5, 'Test Field')).toBe('Test Field must be a whole number');
    });

    it('should return an error message if fieldName is "Special Quantity" and value is less than 2', () => {
        expect(validateField(1, 'Special Quantity')).toBe('Special Quantity must be at least 2');
    });

    it('should return null if value is valid', () => {
        expect(validateField(5, 'Test Field')).toBeNull();
    });
});
