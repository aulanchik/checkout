import { FC } from 'react';
import { Product } from '@/types';
import { formatPrice } from '@/utils';

interface DisplayViewProps {
    product: Product;
    onEdit: (product: Product) => void;
}

const DisplayView: FC<DisplayViewProps> = ({ product, onEdit }) => (
    <div>
        <h3>SKU: {product.sku}</h3>
        {product.specialPrice && (
            <div role="status">
                {product.specialPrice.quantity} for {formatPrice(product.specialPrice.price)}
            </div>
        )}
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
