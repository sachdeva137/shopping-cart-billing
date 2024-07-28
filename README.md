# shopping-cart-billing

This Node.js application calculates the total bill amount for a grocery store, applying various item-specific and total bill promotions along with tax. The application can handle multiple shopping scenarios, each with different items, promotions, and tax rates.

**Features**

**Item-Specific Promotions**:

Buy one get one free
Percentage discounts based on quantity

**Total Bill Promotions**:

Percentage discount on the total bill if a minimum amount is met
Flat discount on the total bill if a minimum amount is met

Tax Calculation:
Applies tax to the subtotal after all discounts.

**Installation**

Clone the repository:
git clone <repository-url>
Navigate to the project directory:
cd shopping-cart-billing
Install the dependencies:
npm install

**Usage**

To run the application and calculate the bill, use the run.js file:
node run.js
This will output the breakdown of costs for the predefined shopping scenarios.

**Project Structure**

index.js: The main logic for calculating the shopping cart totals, including applying item-specific and total bill promotions, and calculating taxes.
run.js: A script to run the application with predefined inputs for testing purposes.
index.test.js: Contains unit tests for the application to verify correct behavior.

**Promotions Explained**

The application supports two types of promotions: Item-Specific Promotions and Total Bill Promotions. Both types can be applied to maximize customer savings.

Item-Specific Promotions
Buy One Get One Free (BOGO): For every item purchased, one additional item is free. The discount is based on the price of the free items.
Percentage Discount: A percentage discount is applied if the quantity purchased exceeds a specified threshold. Only the highest discount is applied per item.
Total Bill Promotions
Percentage Discount: Applied to the entire subtotal if it exceeds a specified minimum amount.
Flat Discount: A fixed amount deducted from the subtotal if it exceeds a specified minimum amount.
Application Order:

Apply the highest item-specific discount to each item.
Apply all applicable total bill promotions.
Calculate tax on the final discounted amount.
This ensures customers receive the maximum possible discount on their purchase.

**Unit Test**

npm test
