import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NumberInput from './NumberInput';

describe('NumberInput Component', () => {

    it('renders the label and input field', () => {
        render(<NumberInput label="Test Label" name="test" value={''} onChange={() => { }} />);

        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('calls onChange with a valid number when a valid number is entered', () => {
        const handleChange = vi.fn();
        render(<NumberInput label="Test Label" name="test" value={''} onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '123' } });

        expect(handleChange).toHaveBeenCalledWith(123);
    });

    it('does not call onChange for invalid input', () => {
        const handleChange = vi.fn();
        render(<NumberInput label="Test Label" name="test" value={''} onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'abc' } });

        expect(handleChange).not.toHaveBeenCalled();
    });

    it('calls onChange with an empty string when input is cleared', () => {
        const handleChange = vi.fn();
        render(<NumberInput label="Test Label" name="test" value={123} onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: '' } });

        expect(handleChange).toHaveBeenCalledWith('');
    });

    it('displays validation errors when validation rules fail', async () => {
        const validationRules = [
            (value: number | '') => (value === '' ? 'Value is required' : null),
            (value: number | '') => (value !== '' && value < 10 ? 'Value must be at least 10' : null),
        ];

        const handleChange = vi.fn();
        const { rerender } = render(
            <NumberInput
                label="Test Label"
                name="test"
                value={''}
                onChange={handleChange}
                validationRules={validationRules}
            />
        );

        expect(screen.getByText('Value is required')).toBeInTheDocument();

        rerender(
            <NumberInput
                label="Test Label"
                name="test"
                value={5}
                onChange={handleChange}
                validationRules={validationRules}
            />
        );

        expect(screen.getByText('Value must be at least 10')).toBeInTheDocument();
    });

    it('does not display validation errors when validation rules pass', async () => {
        const validationRules = [
            (value: number | '') => (value === '' ? 'Value is required' : null),
            (value: number | '') => (value !== '' && value < 10 ? 'Value must be at least 10' : null),
        ];

        render(
            <NumberInput
                label="Test Label"
                name="test"
                value={15}
                onChange={() => { }}
                validationRules={validationRules}
            />
        );

        expect(screen.queryByText('Value is required')).not.toBeInTheDocument();
        expect(screen.queryByText('Value must be at least 10')).not.toBeInTheDocument();
    });
});
