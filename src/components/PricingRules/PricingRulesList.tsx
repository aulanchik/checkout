import { FC } from 'react';
import { Product } from '@/types';
import PricingRuleItem from './PricingRuleItem';

interface PricingRulesListProps {
    products: Product[];
    editingProduct: Product | null;
    validationErrors: { [key: string]: string };
    onEdit: (product: Product) => void;
    onSave: (updatedProduct: Product) => void;
    onChange?: (updatedProduct: Product) => void;
    onCancel: () => void;
}

const PricingRulesList: FC<PricingRulesListProps> = ({
    products,
    editingProduct,
    validationErrors,
    onEdit,
    onSave,
    onCancel,
    onChange,
}) => (
    <div className="rules-list">
        {products.map((product) => (
            <PricingRuleItem
                key={product.sku}
                product={product}
                isEditing={editingProduct?.sku === product.sku}
                editingProduct={editingProduct}
                validationErrors={validationErrors}
                onChange={onChange}
                onCancel={onCancel}
                onEdit={onEdit}
                onSave={onSave}
            />
        ))}
    </div>
);

export default PricingRulesList;
