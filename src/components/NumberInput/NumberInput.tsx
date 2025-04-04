import { FC, ChangeEvent } from 'react';

interface NumberInputProps {
    label: string;
    name: string;
    value: number | '';
    onChange: (value: number | '') => void;
    validationRules?: ((value: number | '') => string | null)[];
}

const NumberInput: FC<NumberInputProps> = ({ label, name, value, onChange, validationRules }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (newValue === '') {
            onChange('');
        } else {
            const parsedValue = Number(newValue);

            if (!isNaN(parsedValue)) {
                onChange(parsedValue);
            }
        }
    };

    return (
        <div className="price-input">
            <label htmlFor={name}>{label}</label>
            <input
                type="text"
                name={name}
                value={value === '' ? '' : value}
                onChange={handleChange}
            />

            {validationRules?.map((validate, index) => {
                const error = validate(value);
                return error ? <span key={index} className="error">{error}</span> : null;
            })}
        </div>
    );
};

export default NumberInput;
