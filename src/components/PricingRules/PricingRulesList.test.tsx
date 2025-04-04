import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PricingRulesList from './PricingRulesList';
import { Product } from '@/types';

vi.mock('./PricingRuleItem', () => ({
    default: ({ product, isEditing }: any) => (
        <div data-testid="pricing-rule-item">
            {isEditing ? `Editing ${product.sku}` : `Viewing ${product.sku}`}
        </div>
    ),
}));

const mockProducts: Product[] = [
    {
        sku: 'A123',
        unitPrice: 100,
        specialPrice: { quantity: 3, price: 250 },
    },
    {
        sku: 'B456',
        unitPrice: 200,
    },
];

describe('PricingRulesList Component', () => {
    it('renders a list of PricingRuleItem components', () => {
        render(
            <PricingRulesList
                products={mockProducts}
                editingProduct={null}
                validationErrors={{}}
                onEdit={vi.fn()}
                onSave={vi.fn()}
                onCancel={vi.fn()}
            />
        );

        const items = screen.getAllByTestId('pricing-rule-item');
        expect(items).toHaveLength(2);
        expect(items[0]).toHaveTextContent('Viewing A123');
        expect(items[1]).toHaveTextContent('Viewing B456');
    });

    it('sets isEditing to true for the editingProduct', () => {
        render(
            <PricingRulesList
                products={mockProducts}
                editingProduct={mockProducts[1]}
                validationErrors={{}}
                onEdit={vi.fn()}
                onSave={vi.fn()}
                onCancel={vi.fn()}
            />
        );

        const items = screen.getAllByTestId('pricing-rule-item');
        expect(items[0]).toHaveTextContent('Viewing A123');
        expect(items[1]).toHaveTextContent('Editing B456');
    });

    it('does not crash when no products are passed', () => {
        render(
            <PricingRulesList
                products={[]}
                editingProduct={null}
                validationErrors={{}}
                onEdit={vi.fn()}
                onSave={vi.fn()}
                onCancel={vi.fn()}
            />
        );

        expect(screen.queryByTestId('pricing-rule-item')).not.toBeInTheDocument();
    });
});
