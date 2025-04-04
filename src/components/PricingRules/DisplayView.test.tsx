import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DisplayView from './DisplayView';
import { Product } from '@/types';

vi.mock('@/utils', () => ({
    formatPrice: (price: number) => `$${price.toFixed(2)}`
}));

const mockProduct: Product = {
    sku: 'A123',
    unitPrice: 50,
    specialPrice: {
        quantity: 3,
        price: 120
    }
};

describe('DisplayView Component', () => {
    it('renders product SKU and unit price', () => {
        render(<DisplayView product={mockProduct} onEdit={() => { }} />);

        expect(screen.getByText('SKU: A123')).toBeInTheDocument();
        expect(screen.getByText('Price: $50.00')).toBeInTheDocument();
    });

    it('displays special price deal when available', () => {
        render(<DisplayView product={mockProduct} onEdit={() => { }} />);

        expect(screen.getByRole('status')).toHaveTextContent('3 for $120.00');
    });

    it('does not display special deal if quantity or price is 0', () => {
        const productWithNoDeal: Product = {
            ...mockProduct,
            specialPrice: { quantity: 0, price: 0 }
        };

        render(<DisplayView product={productWithNoDeal} onEdit={() => { }} />);
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('calls onEdit with the correct product when Edit button is clicked', () => {
        const handleEdit = vi.fn();
        render(<DisplayView product={mockProduct} onEdit={handleEdit} />);

        const button = screen.getByRole('button', {
            name: /edit pricing rule for item A123/i
        });

        fireEvent.click(button);

        expect(handleEdit).toHaveBeenCalledWith(mockProduct);
    });
});
