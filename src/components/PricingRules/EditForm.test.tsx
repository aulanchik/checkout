import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import EditForm from './EditForm';
import { Product } from '@/types';

vi.mock('@/components', () => ({
    NumberInput: ({ label, name, value, onChange }: any) => (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={(e) => {
                    const val = e.target.value === '' ? '' : Number(e.target.value);
                    onChange(val);
                }}
            />
        </div>
    )
}));

vi.mock('@/utils/validators', async () => {
    return {
        validateField: (value: number | '', label: string) => {
            if (value === '' || Number(value) <= 0) return `${label} is required`;
            return null;
        },
        validateSpecialFields: (quantity: number | '', price: number | '') => {
            if (quantity && !price) return 'Both special fields must be filled';
            if (!quantity && price) return 'Both special fields must be filled';
            return null;
        }
    };
});

const mockProduct: Product = {
    sku: 'A123',
    unitPrice: 50,
    specialPrice: {
        quantity: 3,
        price: 120
    }
};

describe('EditForm Component', () => {
    it('renders all fields and buttons', () => {
        render(
            <EditForm
                product={mockProduct}
                onSave={() => { }}
                onCancel={() => { }}
                onChange={() => { }}
            />
        );

        expect(screen.getByText(/SKU: A123/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Unit Price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Special Quantity/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Special Price/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });

    it('calls onSave with valid data', () => {
        const onSave = vi.fn();

        render(
            <EditForm
                product={mockProduct}
                onSave={onSave}
                onCancel={() => { }}
                onChange={() => { }}
            />
        );

        fireEvent.change(screen.getByLabelText(/Unit Price/i), {
            target: { value: '60' }
        });

        fireEvent.change(screen.getByLabelText(/Special Quantity/i), {
            target: { value: '2' }
        });

        fireEvent.change(screen.getByLabelText(/Special Price/i), {
            target: { value: '90' }
        });

        fireEvent.click(screen.getByText(/Save/i));

        expect(onSave).toHaveBeenCalledWith({
            sku: 'A123',
            unitPrice: 60,
            specialPrice: {
                quantity: 2,
                price: 90
            }
        });
    });

    it('displays validation errors on invalid input', () => {
        render(
            <EditForm
                product={mockProduct}
                onSave={() => { }}
                onCancel={() => { }}
                onChange={() => { }}
            />
        );

        fireEvent.change(screen.getByLabelText(/Unit Price/i), {
            target: { value: '0' }
        });

        fireEvent.change(screen.getByLabelText(/Special Price/i), {
            target: { value: '' }
        });

        fireEvent.click(screen.getByText(/Save/i));

        expect(screen.getByText('Unit Price is required')).toBeInTheDocument();

        const specialFieldErrors = screen.getAllByText('Both special fields must be filled');
        expect(specialFieldErrors).toHaveLength(2);
    });

    it('calls onCancel when cancel is clicked', () => {
        const onCancel = vi.fn();

        render(
            <EditForm
                product={mockProduct}
                onSave={() => { }}
                onCancel={onCancel}
                onChange={() => { }}
            />
        );

        fireEvent.click(screen.getByText(/Cancel/i));
        expect(onCancel).toHaveBeenCalled();
    });

    it('calls onChange on each input change', () => {
        const onChange = vi.fn();

        render(
            <EditForm
                product={mockProduct}
                onSave={() => { }}
                onCancel={() => { }}
                onChange={onChange}
            />
        );

        fireEvent.change(screen.getByLabelText(/Unit Price/i), {
            target: { value: '75' }
        });

        expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ unitPrice: 75 }));
    });
});
