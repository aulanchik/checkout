import { FC } from 'react';
import { Plus, Minus } from 'react-feather'

export interface BasketItemProps {
    sku: string;
    quantity: number;
    unitPrice: string;
    onRemove: () => void;
    onAdd: () => void;
}

const BasketItem: FC<BasketItemProps> = ({
    sku,
    quantity,
    unitPrice,
    onRemove,
    onAdd
}) => {
    return (
        <div className="basket-item" role="listitem">
            <div className='basket-item-info'>
                <span className='basket-item-info-name'>{sku}</span>
                <span className='basket-item-info-price'>{unitPrice} each</span>
            </div>
            <div className='basket-item-controls'>
                <button
                    onClick={onRemove}
                    className='basket-item-controls-minus'
                    aria-label={`Remove one Item ${sku}`}
                >
                    <Minus />
                </button>
                <span className="basket-item-controls-value" aria-label={`Quantity of Item ${sku}`}>{quantity}</span>
                <button
                    onClick={onAdd}
                    className='basket-item-controls-plus'
                    aria-label={`Add one more Item ${sku}`}
                >
                    <Plus />
                </button>
            </div>
        </div>
    );
};

export default BasketItem;
