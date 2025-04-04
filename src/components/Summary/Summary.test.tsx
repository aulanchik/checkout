import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import Summary from './Summary';

vi.mock('@/hooks/useBasket', () => ({
    default: () => ({
        calculateTotal: vi.fn(() => 499),
    }),
}));

vi.mock('@/utils', () => ({
    formatPrice: (value: number) => `£${value / 100}`,
}));

describe('Summary Component', () => {
    it('renders the total price', () => {
        render(<Summary />);
        expect(screen.getByText('Total:')).toBeInTheDocument();
        expect(screen.getByText('£4.99')).toBeInTheDocument();
    });
});
