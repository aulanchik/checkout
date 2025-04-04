import { useContext } from "react";
import { BasketContext } from "@/contexts/BasketContext";

const useBasket = () => {
    const context = useContext(BasketContext);

    if (!context) {
        throw new Error('useBasket() should be used within a BasketProvider instance.');
    }

    return context;
}

export default useBasket;
