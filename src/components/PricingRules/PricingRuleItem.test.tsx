import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PricingRuleItem from './PricingRuleItem';
import { Product } from '@/types';

const mockProduct: Product = {
    sku: 'A123',
    unitPrice: 100,
    specialPrice: {
        quantity: 3,
        price: 250
    }
};

describe('PricingRuleItem Component', () => {
    it('renders DisplayView when not editing', () => {
        render(
            <PricingRuleItem
                product={mockProduct}
                isEditing={false}
                editingProduct={null}
                validationErrors={{}}
                onEdit={vi.fn()}
                onSave={vi.fn()}
                onCancel={vi.fn()}
            />
        );

        expect(screen.getByText(/SKU: A123/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /edit pricing rule/i })).toBeInTheDocument();
    });

    it('calls onEdit when Edit button is clicked', () => {
        const handleEdit = vi.fn();

        render(
            <PricingRuleItem
                product={mockProduct}
                isEditing={false}
                editingProduct={null}
                validationErrors={{}}
                onEdit={handleEdit}
                onSave={vi.fn()}
                onCancel={vi.fn()}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /edit pricing rule/i }));
        expect(handleEdit).toHaveBeenCalledWith(mockProduct);
    });

    it('renders EditForm when editing', () => {
        render(
            <PricingRuleItem
                product={mockProduct}
                isEditing={true}
                editingProduct={mockProduct}
                validationErrors={{}}
                onEdit={vi.fn()}
                onSave={vi.fn()}
                onCancel={vi.fn()}
            />
        );

        expect(screen.getByText(/SKU: A123/)).toBeInTheDocument();
        expect(screen.getByText(/Unit Price \(p\):/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('calls onCancel when Cancel button is clicked', () => {
        const handleCancel = vi.fn();

        render(
            <PricingRuleItem
                product={mockProduct}
                isEditing={true}
                editingProduct={mockProduct}
                validationErrors={{}}
                onEdit={vi.fn()}
                onSave={vi.fn()}
                onCancel={handleCancel}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
        expect(handleCancel).toHaveBeenCalled();
    });

    it('calls onSave when Save button is clicked with valid input', () => {
        const handleSave = vi.fn();

        render(
            <PricingRuleItem
                product={mockProduct}
                isEditing={true}
                editingProduct={mockProduct}
                validationErrors={{}}
                onEdit={vi.fn()}
                onSave={handleSave}
                onCancel={vi.fn()}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /save/i }));
        expect(handleSave).toHaveBeenCalled();
    });
});
