import { FC, useState } from 'react';
import { NumberInput } from '@/components';
import { Product } from '@/types';
import { validateField, validateSpecialFields } from '@/utils/validators';

interface EditFormProps {
    product: Product;
    onCancel: () => void;
    onSave: (updatedProduct: Product) => void;
    onChange: (updatedProduct: Product) => void;
}

const EditForm: FC<EditFormProps> = ({ product, onSave, onCancel, onChange }) => {
    const [unitPrice, setUnitPrice] = useState<number | ''>(product.unitPrice || '');
    const [specialQuantity, setSpecialQuantity] = useState<number | ''>(product.specialPrice?.quantity ?? '');
    const [specialPrice, setSpecialPrice] = useState<number | ''>(product.specialPrice?.price ?? '');
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string | null }>({});

    const handleChange = (field: 'unitPrice' | 'specialQuantity' | 'specialPrice', value: number | '') => {
        if (field === 'unitPrice') setUnitPrice(value);
        if (field === 'specialQuantity') setSpecialQuantity(value);
        if (field === 'specialPrice') setSpecialPrice(value);

        const updatedProduct: Product = {
            ...product,
            unitPrice: field === 'unitPrice' ? (value as number) : unitPrice as number,
            specialPrice: specialQuantity && specialPrice ? {
                quantity: field === 'specialQuantity' ? (value as number) : specialQuantity as number,
                price: field === 'specialPrice' ? (value as number) : specialPrice as number,
            } : undefined
        };

        onChange(updatedProduct);
    };

    const handleSave = () => {
        const errors = {
            unitPrice: validateField(unitPrice, 'Unit Price'),
            specialQuantity: validateField(specialQuantity, 'Special Quantity'),
            specialPrice: validateField(specialPrice, 'Special Price'),
        };

        const specialFieldsError = validateSpecialFields(specialQuantity, specialPrice);
        if (specialFieldsError) {
            errors.specialQuantity = specialFieldsError;
            errors.specialPrice = specialFieldsError;
        }

        setValidationErrors(errors);

        if (!errors.unitPrice && !errors.specialQuantity && !errors.specialPrice) {
            onSave({
                ...product,
                unitPrice: unitPrice as number,
                specialPrice: specialQuantity && specialPrice ? {
                    quantity: specialQuantity as number,
                    price: specialPrice as number,
                } : undefined,
            });
        }
    };

    return (
        <div className="rule-edit-form">
            <h3>SKU: {product.sku}</h3>

            <NumberInput
                label="Unit Price (p):"
                name="unitPrice"
                value={unitPrice}
                onChange={(value) => handleChange('unitPrice', value)}
                validationRules={[
                    (value) => validateField(value, 'Unit Price'),
                ]}
            />
            {validationErrors.unitPrice && <span className="error">{validationErrors.unitPrice}</span>}

            <NumberInput
                label="Special Quantity:"
                name="specialQuantity"
                value={specialQuantity}
                onChange={(value) => handleChange('specialQuantity', value)}
                validationRules={[
                    (value) => validateField(value, 'Special Quantity'),
                ]}
            />
            {validationErrors.specialQuantity && <span className="error">{validationErrors.specialQuantity}</span>}

            <NumberInput
                label="Special Price:"
                name="specialPrice"
                value={specialPrice}
                onChange={(value) => handleChange('specialPrice', value)}
                validationRules={[
                    (value) => validateField(value, 'Special Price'),
                ]}
            />
            {validationErrors.specialPrice && <span className="error">{validationErrors.specialPrice}</span>}

            <div className="button-group">
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditForm;
