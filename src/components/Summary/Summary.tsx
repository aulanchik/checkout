import { FC } from 'react'
import { formatPrice } from '@/utils';
import useBasket from '@/hooks/useBasket';

const Summary: FC = () => {
    const { calculateTotal } = useBasket();
    const totalPrice = calculateTotal();

    return (
        <div>
            <h3>Total:</h3>
            <span>{formatPrice(totalPrice)}</span>
        </div>
    )
}

export default Summary;
