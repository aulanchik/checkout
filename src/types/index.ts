interface Product {
    sku: string;
    unitPrice: number;
    specialPrice?: {
        price: number;
        quantity: number;
    }
}

interface BasketItem {

}

interface PricingRules {
    products: Product[];
}

export type {
    Product,
    BasketItem,
    PricingRules
}
