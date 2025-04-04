import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Basket from './Basket';

vi.mock('@/hooks/useBasket', () => ({
    default: () => mockUseBasket,
}));

vi.mock('@/utils', async () => {
    const actual = await vi.importActual('@/utils');
    return {
        ...actual,
        findProductBySku: vi.fn((sku, products) => products.find((p: any) => p.sku === sku)),
        formatPrice: vi.fn((price) => `$${price.toFixed(2)}`),
    };
});

vi.mock('./BasketItem', () => ({
    default: ({ sku, quantity, unitPrice }: any) => (
        <div>
            <p>{sku}</p>
            <p>{quantity}</p>
            <p>{unitPrice}</p>
        </div>
    ),
}));

vi.mock('./AddItemForm', () => ({
    default: ({ skuInput, onSkuInput, onAddItem, isAddDisabled }: any) => (
        <div>
            <input
                aria-label="SKU Input"
                value={skuInput}
                onChange={(e) => onSkuInput(e.target.value)}
            />
            <button onClick={onAddItem} disabled={isAddDisabled}>Add</button>
        </div>
    ),
}));

vi.mock('./BasketActions', () => ({
    default: ({ onClearBasket }: any) => (
        <button onClick={onClearBasket}>Clear Basket</button>
    ),
}));

vi.mock('../Summary', () => ({
    default: () => <div>Summary Component</div>,
}));

const mockUseBasket = {
    basket: [] as { sku: string; quantity: number }[],
    pricingRules: {
        products: [
            { sku: 'A', unitPrice: 50 },
            { sku: 'B', unitPrice: 30 },
        ],
    },
    addItemQuantity: vi.fn(),
    removeItemQuantity: vi.fn(),
    clearBasket: vi.fn(),
};

describe('Basket Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockUseBasket.basket = [];
    });

    it('renders an empty basket message', () => {
        render(<Basket />);
        expect(screen.getByText('Your basket is empty')).toBeInTheDocument();
    });

    it('renders basket items when basket is not empty', () => {
        mockUseBasket.basket = [{ sku: 'A', quantity: 2 }];
        render(<Basket />);
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('$50.00')).toBeInTheDocument();
    });

    it('calls addItemQuantity when Add button is clicked with valid SKU', () => {
        render(<Basket />);
        const input = screen.getByLabelText('SKU Input');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'a' } });
        fireEvent.click(addButton);

        expect(mockUseBasket.addItemQuantity).toHaveBeenCalledWith('A');
    });

    it('does not call addItemQuantity when SKU is invalid', () => {
        render(<Basket />);
        const input = screen.getByLabelText('SKU Input');
        const addButton = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'X' } });
        expect(addButton).toBeDisabled();
    });

    it('calls clearBasket when "Clear Basket" is clicked', () => {
        mockUseBasket.basket = [{ sku: 'A', quantity: 2 }];
        render(<Basket />);
        fireEvent.click(screen.getByText('Clear Basket'));
        expect(mockUseBasket.clearBasket).toHaveBeenCalled();
    });

    it('renders Summary component', () => {
        render(<Basket />);
        expect(screen.getByText('Summary Component')).toBeInTheDocument();
    });
});
