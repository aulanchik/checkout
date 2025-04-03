import { FC } from 'react';
import { Trash } from 'react-feather';

interface BasketActionsProps {
    onClearBasket: () => void;
}

const BasketActions: FC<BasketActionsProps> = ({ onClearBasket }) => (
    <div className='basket-actions'>
        <button
            onClick={onClearBasket}
            className="basket-actions-button"
            aria-label="Clear all items from basket"
        >
            <Trash aria-hidden="true" />
            <span>Clear Basket</span>
        </button>
    </div>
);

export default BasketActions;
