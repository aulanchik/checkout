interface Product {
    sku: string;
    unitPrice: number;
    specialPrice?: {
        price: number;
        quantity: number;
    }
}

interface BasketItem {
    sku: string;
    quantity: number;
}

interface PricingRules {
    products: Product[];
}

export type {
    Product,
    BasketItem,
    PricingRules
}
