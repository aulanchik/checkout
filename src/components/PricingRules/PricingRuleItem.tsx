import { FC } from 'react';
import { Product } from '@/types';
import EditForm from './EditForm'
import DisplayView from './DisplayView'

interface PricingRuleItemProps {
    product: Product;
    isEditing: boolean;
    editingProduct: Product | null;
    validationErrors: { [key: string]: string };
    onEdit: (product: Product) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onCancel: () => void;
}

const PricingRuleItem: FC<PricingRuleItemProps> = ({
    product,
    isEditing,
    editingProduct,
    validationErrors,
    onEdit,
    onChange,
    onSave,
    onCancel,
}) => (
    <div>
        {isEditing ? (
            <EditForm
                product={product}
                editingProduct={editingProduct}
                validationErrors={validationErrors}
                onChange={onChange}
                onSave={onSave}
                onCancel={onCancel}
            />
        ) : (
            <DisplayView product={product} onEdit={onEdit} />
        )}
    </div>
);

export default PricingRuleItem;
