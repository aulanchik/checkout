# Store Checkout

This repository contains a dynamic shopping cart checkout application built with React, TypeScript, and Vite. It allows users to manage a shopping basket, apply complex pricing rules including special offers, and edit these rules in real-time.

## Features

*   **Dynamic Basket Management**: Add items to the basket by SKU, adjust quantities, or clear the entire basket.
*   **Real-time Total Calculation**: The total price is instantly updated as items are added or quantities change.
*   **Complex Pricing Logic**: Supports both standard unit pricing and special multi-buy offers (e.g., "3 for the price of 2").
*   **Editable Pricing Rules**: An intuitive interface to view and modify the pricing rules for each product, including unit prices and special deals.
*   **Form Validation**: Client-side validation ensures that pricing rule modifications are valid before saving.
*   **Responsive Design**: A responsive layout that works across different screen sizes.

## Tech Stack

*   **Framework**: React 19
*   **Language**: TypeScript
*   **Build Tool**: Vite
*   **Styling**: SCSS
*   **State Management**: React Context API
*   **Testing**: Vitest, React Testing Library
*   **Linting**: ESLint
*   **Formatting**: Prettier

## Project Structure

The project follows a standard React application structure, organized for clarity and scalability.

```
src/
├── assets/         # SCSS stylesheets and other static assets
├── components/     # Reusable React components
│   ├── Basket/     # Components related to the shopping basket
│   ├── PricingRules/ # Components for displaying and editing pricing rules
│   └── ...
├── contexts/       # React Context for global state management (BasketContext)
├── data/           # Initial data, like default pricing rules
├── hooks/          # Custom React hooks (useBasket)
├── tests/          # Test setup and configuration
├── types/          # TypeScript type definitions
├── utils/          # Helper functions (calculations, formatting, validation)
├── App.tsx         # Main application component
└── main.tsx        # Application entry point
```

## Core Logic

### State Management

The application's state, including the contents of the basket and the current pricing rules, is managed globally using React's Context API. `BasketContext.tsx` provides the state and functions to manipulate it, such as `addItemQuantity`, `removeItemQuantity`, `clearBasket`, and `updatePricingRule`.

### Price Calculation

The total cost is calculated by the `calculateTotal` function within the `BasketContext`. For each item in the basket, it checks for applicable special offers.

-   If a special offer exists and the item quantity meets the offer's requirement, the price is calculated based on the special deal. For example, for an offer of "3 for 130p" and a quantity of 4, the total for that item would be `130p` (for the first 3) + `50p` (for the remaining 1 at its unit price).
-   If no special offer applies, the price is simply the `unitPrice` multiplied by the `quantity`.

This logic is encapsulated in the `calculateItemPrice` helper function.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm, pnpm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/aulanchik/checkout.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd checkout
    ```

3.  **Install the dependencies:**
    ```sh
    npm install
    ```

### Available Scripts

*   **To run the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

*   **To run the tests:**
    ```sh
    npm test
    ```

*   **To run tests with a UI:**
    ```sh
    npm run test:ui
    ```

*   **To generate a test coverage report:**
    ```sh
    npm run test:coverage
    ```

*   **To build the application for production:**
    ```sh
    npm run build
    ```
    The production-ready files will be located in the `dist` directory.

*   **To preview the production build locally:**
    ```sh
    npm run preview
