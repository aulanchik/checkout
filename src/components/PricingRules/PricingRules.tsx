import { FC, useState } from 'react';
import { Product } from '@/types';
import useBasket from '@/hooks/useBasket';
import PricingRulesList from './PricingRulesList';

const PricingRules: FC = () => {
    const { pricingRules, updatePricingRule } = useBasket();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleEdit = (product: Product) => {
        setEditingProduct({
            ...product,
            specialPrice: product.specialPrice
                ? { quantity: product.specialPrice.quantity, price: product.specialPrice.price }
                : { quantity: 2, price: 0 },
        });
        setValidationErrors({});
    };

    const handleSave = (updatedProduct: Product) => {
        if (updatedProduct) {
            updatePricingRule(updatedProduct);
            setEditingProduct(null);
            setValidationErrors({});
        }
    };

    const handleCancel = () => {
        setEditingProduct(null);
        setValidationErrors({});
    };

    return (
        <div className="pricing-rules" role="region" aria-label="Pricing Rules">
            <h2 className="section-title">Pricing Rules</h2>
            <PricingRulesList
                products={pricingRules.products}
                editingProduct={editingProduct}
                validationErrors={validationErrors}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default PricingRules;
