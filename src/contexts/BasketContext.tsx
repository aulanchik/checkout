import { FC, createContext, useState, ReactNode } from 'react'
import { BasketItem, PricingRules, Product } from '@/types'
import initPricingRules from '@/data/pricing'

interface BasketContextType {
    basket: BasketItem[];
    pricingRules: PricingRules;
    addItemQuantity: (sku: string) => void;
    removeItemQuantity: (sku: string) => void;
    removeFromBasket: (sku: string) => void;
    calculateTotal: () => number;
    clearBasket: () => void;
    updatePricingRule: (updatedProduct: Product) => void
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const BasketProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [basket, setBasket] = useState<BasketItem[]>([]);
    const [pricingRules, setPricingRules] = useState<PricingRules>(initPricingRules);

    const addItemQuantity = (sku: string) => {
        setBasket(prevBasket => {
            const existingItem = prevBasket.find(item => item.sku === sku);

            if (existingItem) {
                return prevBasket.map(item =>
                    item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevBasket, { sku, quantity: 1 }];
            }
        });
    }

    const removeItemQuantity = (sku: string) => {
        setBasket(prevBasket => {
            const existingItem = prevBasket.find(item => item.sku === sku);

            if (existingItem && existingItem.quantity > 1) {
                return prevBasket.map(item =>
                    item.sku === sku ? { ...item, quantity: item.quantity - 1 } : item
                );
            } else {
                return prevBasket.filter(item => item.sku !== sku);
            }
        });
    };

    const removeFromBasket = (sku: string) => {
        setBasket(prevBasket => prevBasket.filter(item => item.sku !== sku));
    };

    const clearBasket = () => {
        setBasket([]);
    };

    const updatePricingRule = (updatedProduct: Product) => {
        setPricingRules(prev => ({
            products: prev.products.map(product =>
                product.sku === updatedProduct.sku ? updatedProduct : product
            )
        }));
    };

    const calculateItemPrice = (sku: string, quantity: number) => {
        const product = pricingRules.products.find(p => p.sku === sku);

        if (!product) return 0;

        if (product.specialPrice && quantity >= product.specialPrice.quantity) {
            const specialPriceDeals = Math.floor(quantity / product.specialPrice.quantity);
            const remainingItems = quantity % product.specialPrice.quantity;

            return (specialPriceDeals * product.specialPrice.price) + (remainingItems * product.unitPrice);
        }

        return quantity * product.unitPrice;
    };

    const calculateTotal = () => {
        return basket.reduce((total, item) => {
            return total + calculateItemPrice(item.sku, item.quantity);
        }, 0);
    };

    return (
        <BasketContext.Provider value={{
            basket,
            pricingRules,
            addItemQuantity,
            removeItemQuantity,
            removeFromBasket,
            clearBasket,
            calculateTotal,
            updatePricingRule
        }}>
            {children}
        </BasketContext.Provider>
    );
}

export {
    BasketContext,
    BasketProvider
}
