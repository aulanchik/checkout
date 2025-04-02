const validateSpecialQuantity = (inputValue: string): string => {
    let numValue = parseInt(inputValue, 10);
    if (isNaN(numValue) || numValue < 2) {
        numValue = 2;
    }
    return numValue.toString();
};

const validateDecimalInput = (inputValue: string): string => {
    const [whole, decimal] = inputValue.split('.');
    if (decimal && decimal.length > 2) {
        return `${whole}.${decimal.slice(0, 2)}`;
    }
    return inputValue;
};

const isValidKeyPress = (
    key: string,
    currentValue: string,
    allowDecimal: boolean
): boolean => {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
    if (/^\d$/.test(key) || allowedKeys.includes(key)) {
        return true;
    }
    if (allowDecimal && key === '.' && !currentValue.includes('.')) {
        return true;
    }
    return false;
};

export {
    validateSpecialQuantity,
    validateDecimalInput,
    isValidKeyPress,
}
