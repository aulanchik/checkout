const validateNonEmpty = (value: number | ''): string | null => {
    return value === '' ? 'This field cannot be empty' : null;
};

const validatePositiveInteger = (value: number | ''): string | null => {
    if (value === '') return null;
    if (value < 0) return 'Value must be a positive number';
    if (!Number.isInteger(value)) return 'Value must be a whole number';
    return null;
};

const validateNotZero = (value: number | '', fieldName: string): string | null => {
    return value === 0 ? `${fieldName} cannot be zero` : null;
};

const validateMinValue = (value: number | '', fieldName: string, min: number): string | null => {
    if (value !== '' && value < min) {
        return `${fieldName} must be at least ${min}`;
    }
    return null;
};

const validateSpecialFields = (specialQuantity: number | '', specialPrice: number | ''): string | null => {
    if (specialQuantity === '' && specialPrice === '') return null;

    if (specialQuantity !== '' && specialPrice === '') {
        return 'Special Price must be specified if Special Quantity is provided';
    }

    if (specialQuantity === '' && specialPrice !== '') {
        return 'Special Quantity must be specified if Special Price is provided';
    }

    return null;
};

const validateField = (value: number | '', fieldName: string): string | null => {
    if (value === '') return `${fieldName} is required`;
    if (value === 0) return `${fieldName} cannot be zero`;
    if (value < 0) return `${fieldName} must be a positive number`;
    if (!Number.isInteger(value)) return `${fieldName} must be a whole number`;
    if (fieldName === 'Special Quantity' && value < 2) {
        return `${fieldName} must be at least 2`;
    }
    return null;
};

export {
    validateNonEmpty,
    validatePositiveInteger,
    validateNotZero,
    validateMinValue,
    validateSpecialFields,
    validateField,
};
