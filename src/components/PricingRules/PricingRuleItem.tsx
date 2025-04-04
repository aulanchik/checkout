import { FC } from 'react';
import { Product } from '@/types';
import EditForm from './EditForm';
import DisplayView from './DisplayView';

interface PricingRuleItemProps {
    product: Product;
    isEditing: boolean;
    editingProduct: Product | null;
    validationErrors: { [key: string]: string };
    onEdit: (product: Product) => void;
    onSave: (updatedProduct: Product) => void;
    onChange?: (updatedProduct: Product) => void;
    onCancel: () => void;
}

const PricingRuleItem: FC<PricingRuleItemProps> = ({
    product,
    isEditing,
    onEdit,
    onSave,
    onCancel,
    onChange = () => { },
}) => (
    <div className="rules-list-item">
        {isEditing ? (
            <EditForm
                product={product}
                onCancel={onCancel}
                onChange={onChange}
                onSave={onSave}
            />
        ) : (
            <DisplayView product={product} onEdit={onEdit} />
        )}
    </div>
);

export default PricingRuleItem;
