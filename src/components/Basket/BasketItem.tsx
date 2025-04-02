import { FC } from 'react';
import { PlusCircle, MinusCircle } from 'react-feather'

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
        <div role="listitem">
            <div>
                <span>{sku}</span>
                <span>{unitPrice} each</span>
            </div>
            <div>
                <button
                    onClick={onRemove}
                    aria-label={`Remove one Item ${sku}`}
                >
                    <MinusCircle />
                </button>
                <span aria-label={`Quantity of Item ${sku}`}>{quantity}</span>
                <button
                    onClick={onAdd}
                    aria-label={`Add one more Item ${sku}`}
                >
                    <PlusCircle />
                </button>
            </div>
        </div>
    );
};

export default BasketItem;
