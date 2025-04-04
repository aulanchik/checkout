import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import PricingRules from './PricingRules';

// Mocks
const mockUpdatePricingRule = vi.fn();
const mockProducts = [
    { sku: 'A123', unitPrice: 100, specialPrice: { quantity: 2, price: 50 } },
    { sku: 'B456', unitPrice: 200, specialPrice: { quantity: 1, price: 150 } }
];

vi.mock('@/hooks/useBasket', () => ({
    default: () => ({
        pricingRules: { products: mockProducts },
        updatePricingRule: mockUpdatePricingRule,
    }),
}));

vi.mock('./PricingRulesList', () => ({
    default: ({ onEdit, onSave, onCancel, products, editingProduct, validationErrors }: any) => (
        <div>
            {products.map((product: any) => (
                <div key={product.sku}>
                    {!editingProduct?.sku && (
                        <button onClick={() => onEdit(product)}>Edit</button>
                    )}

                    {editingProduct?.sku === product.sku && (
                        <div>
                            <label htmlFor="unitPrice">Unit Price (p):</label>
                            <input
                                id="unitPrice"
                                name="unitPrice"
                                value={product.unitPrice || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    product.unitPrice = e.target.value;
                                }}
                            />
                            {validationErrors['unitPrice'] && (
                                <span>{validationErrors['unitPrice']}</span>
                            )}

                            <button onClick={() => onSave(product)}>Save</button>
                            <button onClick={onCancel}>Cancel</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    ),
}));

describe('PricingRules Component', () => {
    it('renders the pricing rules section correctly', () => {
        render(<PricingRules />);
        expect(screen.getByRole('region', { name: /pricing rules/i })).toBeInTheDocument();
        expect(screen.getByText('Pricing Rules')).toBeInTheDocument();
    });

    it('handles edit action correctly', () => {
        render(<PricingRules />);

        fireEvent.click(screen.getAllByText('Edit')[0]);

        const saveButton = screen.getAllByText('Save')[0];
        const cancelButton = screen.getAllByText('Cancel')[0];

        expect(saveButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it('handles save action correctly', () => {
        render(<PricingRules />);

        fireEvent.click(screen.getAllByText('Edit')[0]);
        fireEvent.click(screen.getAllByText('Save')[0]);

        expect(mockUpdatePricingRule).toHaveBeenCalledTimes(1);
        expect(mockUpdatePricingRule).toHaveBeenCalledWith(mockProducts[0]);
    });

    it('handles cancel action correctly', () => {
        render(<PricingRules />);

        fireEvent.click(screen.getAllByText('Edit')[0]);
        fireEvent.click(screen.getAllByText('Cancel')[0]);

        expect(screen.getAllByText('Edit')[0]).toBeInTheDocument();
        expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
    });
});
