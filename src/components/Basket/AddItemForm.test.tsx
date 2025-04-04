import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AddItemForm from './AddItemForm';

describe('AddItemForm', () => {
    it('renders input and button', () => {
        render(
            <AddItemForm
                skuInput=""
                onSkuInput={vi.fn()}
                onAddItem={vi.fn()}
                isAddDisabled={true}
            />
        );

        expect(screen.getByPlaceholderText('Enter SKU')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add item/i })).toBeInTheDocument();
    });

    it('calls onSkuInput when typing in the input field', () => {
        const onSkuInputMock = vi.fn();
        render(
            <AddItemForm
                skuInput=""
                onSkuInput={onSkuInputMock}
                onAddItem={vi.fn()}
                isAddDisabled={true}
            />
        );

        const input = screen.getByPlaceholderText('Enter SKU');
        fireEvent.change(input, { target: { value: 'ABCD' } });

        expect(onSkuInputMock).toHaveBeenCalledWith('ABCD');
    });

    it('calls onAddItem when the button is clicked', () => {
        const onAddItemMock = vi.fn();
        render(
            <AddItemForm
                skuInput="A123"
                onSkuInput={vi.fn()}
                onAddItem={onAddItemMock}
                isAddDisabled={false}
            />
        );

        const button = screen.getByRole('button', { name: /add item/i });
        fireEvent.click(button);

        expect(onAddItemMock).toHaveBeenCalled();
    });

    it('disables the button when isAddDisabled is true', () => {
        render(
            <AddItemForm
                skuInput="A123"
                onSkuInput={vi.fn()}
                onAddItem={vi.fn()}
                isAddDisabled={true}
            />
        );

        const button = screen.getByRole('button', { name: /add item/i });
        expect(button).toBeDisabled();
    });

    it('calls onAddItem when Enter key is pressed', () => {
        const onAddItemMock = vi.fn();
        render(
            <AddItemForm
                skuInput="A123"
                onSkuInput={vi.fn()}
                onAddItem={onAddItemMock}
                isAddDisabled={false}
            />
        );

        const input = screen.getByPlaceholderText('Enter SKU');
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(onAddItemMock).toHaveBeenCalled();
    });

    it('does not allow non-alphabetic characters in the input', () => {
        const onSkuInputMock = vi.fn();
        render(
            <AddItemForm
                skuInput=""
                onSkuInput={onSkuInputMock}
                onAddItem={vi.fn()}
                isAddDisabled={true}
            />
        );

        const input = screen.getByPlaceholderText('Enter SKU');
        fireEvent.change(input, { target: { value: '1234' } });

        expect(onSkuInputMock).not.toHaveBeenCalled();
    });
});
