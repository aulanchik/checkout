import { FC, JSX } from "react";
import { BasketProvider } from "./contexts/BasketContext";
import { PricingRules, Basket } from '@/components'
import '@/assets/styles/main.scss';

const App: FC = (): JSX.Element => (
    <BasketProvider>
        <div className="checkout">
            <header className="checkout-header">
                <h1 className='checkout-title'>Store Checkout</h1>
            </header>

            <main className="checkout-main">
                <div className="checkout-wrapper">
                    <div className="checkout-layout">
                        <section className="pricing-section">
                            <PricingRules />
                        </section>

                        <section className="basket-section">
                            <Basket />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    </BasketProvider>
)

export default App;
