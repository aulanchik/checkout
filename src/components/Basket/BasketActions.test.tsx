import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import BasketActions from './BasketActions';

describe('BasketActions', () => {
    it('renders the Clear Basket button', () => {
        render(<BasketActions onClearBasket={() => { }} />);
        expect(screen.getByText('Clear Basket')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /clear all items from basket/i })).toBeInTheDocument();
    });

    it('calls onClearBasket when the button is clicked', () => {
        const onClearBasketMock = vi.fn();
        render(<BasketActions onClearBasket={onClearBasketMock} />);
        const button = screen.getByRole('button', { name: /clear all items from basket/i });
        fireEvent.click(button);
        expect(onClearBasketMock).toHaveBeenCalledTimes(1);
    });
});
