import { FC } from 'react';
import { Product } from '@/types';
import PricingRuleItem from './PricingRuleItem';

interface PricingRulesListProps {
    products: Product[];
    editingProduct: Product | null;
    validationErrors: { [key: string]: string };
    onEdit: (product: Product) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onCancel: () => void;
}

const PricingRulesList: FC<PricingRulesListProps> = ({
    products,
    editingProduct,
    validationErrors,
    onEdit,
    onChange,
    onSave,
    onCancel,
}) => (
    <div className="rules-list">
        {products.map((product) => (
            <PricingRuleItem
                key={product.sku}
                product={product}
                isEditing={editingProduct?.sku === product.sku}
                editingProduct={editingProduct}
                validationErrors={validationErrors}
                onEdit={onEdit}
                onChange={onChange}
                onCancel={onCancel}
                onSave={onSave}
            />
        ))}
    </div>
);

export default PricingRulesList;
