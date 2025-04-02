import { FC, useState } from 'react';
import useBasket from '@/hooks/useBasket';
import PricingRulesList from './PricingRulesList';
import { Product } from '@/types';

const PricingRules: FC = () => {
    const { pricingRules, updatePricingRule } = useBasket();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

    const handleEdit = (product: Product) => {
        setEditingProduct({
            ...product,
            specialPrice: product.specialPrice
                ? { quantity: product.specialPrice.quantity, price: product.specialPrice.price }
                : { quantity: 2, price: 0 }, // Default minimum special quantity is 2
        });
        setValidationErrors({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingProduct) return;

        const { name, value } = e.target;
        const numValue = value === '' ? 0 : parseFloat(value);

        if (isNaN(numValue)) return;

        setEditingProduct((prev) => {
            if (!prev) return null;

            // Ensure specialPrice is always defined
            const updatedProduct: Product = {
                ...prev,
                specialPrice: {
                    quantity: prev.specialPrice?.quantity ?? 0,
                    price: prev.specialPrice?.price ?? 0,
                },
            };

            if (name === 'unitPrice') {
                updatedProduct.unitPrice = numValue;
            } else if (name === 'specialQuantity') {
                updatedProduct.specialPrice!.quantity = Math.max(numValue, 2);
            } else if (name === 'specialPrice') {
                updatedProduct.specialPrice!.price = numValue;
            }

            return updatedProduct;
        });
    };

    const handleSave = () => {
        if (!editingProduct) return;
        updatePricingRule(editingProduct);
        setEditingProduct(null);
        setValidationErrors({});
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
                onChange={handleChange}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default PricingRules;
