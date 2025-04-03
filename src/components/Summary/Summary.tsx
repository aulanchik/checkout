import { FC } from 'react'
import { formatPrice } from '@/utils';
import useBasket from '@/hooks/useBasket';

const Summary: FC = () => {
    const { calculateTotal } = useBasket();
    const totalPrice = calculateTotal();

    return (
        <div className="summary">
            <h3 className="summary-title">Total:</h3>
            <span className="summary-amount">{formatPrice(totalPrice)}</span>
        </div>
    )
}

export default Summary;
