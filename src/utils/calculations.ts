import { BasketItem, Product } from '@/types';

const findProductBySku = (sku: string, products: Product[]): Product | undefined => {
    return products.find(p => p.sku === sku.toUpperCase());
};

const calculateItemPrice = (product: Product, quantity: number): number => {
    if (!product) return 0;

    if (product.specialPrice && quantity >= product.specialPrice.quantity) {
        const specialPriceDeals = Math.floor(quantity / product.specialPrice.quantity);
        const remainingItems = quantity % product.specialPrice.quantity;

        return (specialPriceDeals * product.specialPrice.price) + (remainingItems * product.unitPrice);
    }

    return quantity * product.unitPrice;
};

const calculateBasketTotal = (basketItems: BasketItem[], products: Product[]): number => {
    return basketItems.reduce((total, item) => {
        const product = products.find(p => p.sku === item.sku);
        if (!product) return total;

        return total + calculateItemPrice(product, item.quantity);
    }, 0);
};



export {
    findProductBySku,
    calculateItemPrice,
    calculateBasketTotal,
}
