import { FC, useState } from 'react';
import useBasket from '@/hooks/useBasket';
import { formatPrice, findProductBySku } from '@/utils';
import BasketItem from './BasketItem';
import AddItemForm from './AddItemForm';
import BasketActions from './BasketActions';
import Summary from '../Summary'

const Basket: FC = () => {
    const { basket, pricingRules, addItemQuantity, removeItemQuantity, clearBasket } = useBasket();
    const [skuInput, setSkuInput] = useState('');

    const handleAddItem = () => {
        if (skuInput.trim()) {
            addItemQuantity(skuInput.trim().toUpperCase());
            setSkuInput('');
        }
    };

    const handleSkuInput = (value: string) => {
        setSkuInput(value.toUpperCase());
    };

    const renderBasketItems = () => {
        if (basket.length === 0) {
            return <p className="empty-basket" role="status">Your basket is empty</p>;
        }

        return basket.map(({ sku, quantity }) => {
            const product = findProductBySku(sku, pricingRules.products);
            return (
                <BasketItem
                    key={sku}
                    sku={sku}
                    quantity={quantity}
                    unitPrice={product ? formatPrice(product.unitPrice) : 'N/A'}
                    onRemove={() => removeItemQuantity(sku)}
                    onAdd={() => addItemQuantity(sku)}
                />
            );
        });
    };

    return (
        <section className="basket" role="region" aria-label="Shopping Basket">
            <h2 className="basket-title">Your Basket</h2>

            <AddItemForm
                skuInput={skuInput}
                onSkuInput={handleSkuInput}
                onAddItem={handleAddItem}
                isAddDisabled={!skuInput || !findProductBySku(skuInput, pricingRules.products)}
            />

            <div className="basket-items" role="list" aria-label="Basket items">
                {renderBasketItems()}
            </div>

            {basket.length > 0 && (
                <BasketActions onClearBasket={clearBasket} />
            )}

            <div className="basket-footer">
                <Summary />
            </div>
        </section>
    );
};

export default Basket;
