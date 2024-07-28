// run.js
const calculateShoppingCart = require('./index');

// Combined item and promotion structure
const billDetails1 = [
    {
        item: "Milk",
        quantity: 2, 
        price: 1.50,
        promotions: [
            { type: "buy_one_get_one_free" }
        ]
    },
    {
        item: "Bread",
        quantity: 3, 
        price: 2.00,
        promotions: [
            { type: "percentage_discount", discount: 10, minQuantity: 2 }
        ]
    }
];
const totalBillPromotions1 = [];
const taxRate1 = 5;
console.log(calculateShoppingCart(billDetails1, totalBillPromotions1, taxRate1));

// Additional test cases using the new structure...

const billDetails2 = [
    {
        item: "Eggs",
        quantity: 12, 
        price: 0.10,
        promotions: []
    },
    {
        item: "Cheese",
        quantity: 1, 
        price: 5.00,
        promotions: [
            { type: "percentage_discount", discount: 20 }
        ]
    }
];
const totalBillPromotions2 = [];
const taxRate2 = 5;
console.log(calculateShoppingCart(billDetails2, totalBillPromotions2, taxRate2));
