import { FC, JSX } from "react";
import { BasketProvider } from "./contexts/BasketContext";
import { PricingRules, Basket } from '@/components'

const App: FC = (): JSX.Element => (
    <BasketProvider>
        <div>
            <header>
                <h1>Store Checkout</h1>
            </header>

            <main>
                <div>
                    <div>
                        <section>
                            <PricingRules />
                        </section>

                        <section>
                            <Basket />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    </BasketProvider>
)

export default App;
