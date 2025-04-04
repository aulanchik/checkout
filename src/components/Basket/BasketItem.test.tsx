import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BasketItem from './BasketItem';

describe('BasketItem', () => {
    const mockProps = {
        sku: 'A123',
        quantity: 2,
        unitPrice: '£5.00',
        onRemove: vi.fn(),
        onAdd: vi.fn(),
    };

    it('renders the SKU, quantity, and unit price', () => {
        render(<BasketItem {...mockProps} />);

        expect(screen.getByText(mockProps.sku)).toBeInTheDocument();
        expect(screen.getByText(`${mockProps.unitPrice} each`)).toBeInTheDocument();
        expect(screen.getByLabelText(`Quantity of Item ${mockProps.sku}`)).toHaveTextContent(
            mockProps.quantity.toString()
        );
    });

    it('calls onRemove when the minus button is clicked', () => {
        render(<BasketItem {...mockProps} />);

        const minusButton = screen.getByLabelText(`Remove one Item ${mockProps.sku}`);
        fireEvent.click(minusButton);

        expect(mockProps.onRemove).toHaveBeenCalled();
    });

    it('calls onAdd when the plus button is clicked', () => {
        render(<BasketItem {...mockProps} />);

        const plusButton = screen.getByLabelText(`Add one more Item ${mockProps.sku}`);
        fireEvent.click(plusButton);

        expect(mockProps.onAdd).toHaveBeenCalled();
    });
});
