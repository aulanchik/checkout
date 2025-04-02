import { FC } from 'react';
import PriceInput from '@/components/PriceInput/PriceInput';
import { Product } from '@/types';

interface EditFormProps {
    product: Product;
    editingProduct: Product | null;
    validationErrors: { [key: string]: string };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onCancel: () => void;
}

const EditForm: FC<EditFormProps> = ({ product, editingProduct, validationErrors, onChange, onSave, onCancel }) => (
    <div role="form" aria-label={`Edit pricing rule for item ${product.sku}`}>
        <h3>SKU: {product.sku}</h3>
        <div>
            <PriceInput
                id={`unitPrice-${product.sku}`}
                label="Unit Price (p):"
                name="unitPrice"
                value={editingProduct?.unitPrice || ''}
                onChange={onChange}
                sku={product.sku}
            />
            {validationErrors.unitPrice && (
                <span>{validationErrors.unitPrice}</span>
            )}
        </div>
        <div>
            <PriceInput
                id={`specialQuantity-${product.sku}`}
                label="Special Quantity:"
                name="specialQuantity"
                value={editingProduct?.specialPrice?.quantity || ''}
                onChange={onChange}
                sku={product.sku}
            />
            {validationErrors.specialQuantity && (
                <span>{validationErrors.specialQuantity}</span>
            )}
        </div>
        <div>
            <PriceInput
                id={`specialPrice-${product.sku}`}
                label="Special Price (p):"
                name="specialPrice"
                value={editingProduct?.specialPrice?.price || ''}
                onChange={onChange}
                sku={product.sku}
            />
            {validationErrors.specialPrice && (
                <span>{validationErrors.specialPrice}</span>
            )}
        </div>
        <div>
            <button
                onClick={onSave}
                aria-label={`Save changes for item ${product.sku}`}
            >
                Save
            </button>
            <button
                onClick={onCancel}
                aria-label={`Cancel editing item ${product.sku}`}
            >
                Cancel
            </button>
        </div>
    </div>
);

export default EditForm;
