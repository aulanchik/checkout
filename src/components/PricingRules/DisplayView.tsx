import { FC } from 'react';
import { Product } from '@/types';
import { formatPrice } from '@/utils';

interface DisplayViewProps {
    product: Product;
    onEdit: (product: Product) => void;
}

const DisplayView: FC<DisplayViewProps> = ({ product, onEdit }) => (
    <div className='rule-display' role="listitem">
        <div className='rule-display--header'>
            <h3 className='rule-display--title'>SKU: {product.sku}</h3>
            {product.specialPrice && (
                <div className="special-tag" role="status">
                    {product.specialPrice.quantity} for {formatPrice(product.specialPrice.price)}
                </div>
            )}
        </div>
        <p>Price: {formatPrice(product.unitPrice)}</p>
        <button
            onClick={() => onEdit(product)}
            aria-label={`Edit pricing rule for item ${product.sku}`}
        >
            Edit
        </button>
    </div>
);

export default DisplayView;
