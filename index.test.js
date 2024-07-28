// calculateShoppingCart.test.js
const calculateShoppingCart = require('./index');

describe('calculateShoppingCart', () => {
    it('should correctly calculate the total with multiple promotions on a single item', () => {
        const billDetails = [
            {
                item: "Milk",
                quantity: 2,
                price: 1.50,
                promotions: [
                    { type: "buy_one_get_one_free" },
                    { type: "percentage_discount", discount: 10, minQuantity: 2 }
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
        const totalBillPromotions = [];
        const taxRate = 5;

        const result = calculateShoppingCart(billDetails, totalBillPromotions, taxRate);

        expect(result.subtotal).toBe("9.00"); 
        expect(result.totalDiscount).toBe("2.10"); 
        expect(result.tax).toBe("0.35"); 
        expect(result.total).toBe("7.25");      
    });

    it('should correctly calculate the total with total bill promotions', () => {
        const billDetails = [
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
        const totalBillPromotions = [
            { type: "percentage_discount", discount: 10, minAmount: 4 },
            { type: "flat_discount", discount: 1, minAmount: 5 }
        ];
        const taxRate = 5;

        const result = calculateShoppingCart(billDetails, totalBillPromotions, taxRate);

        expect(result.subtotal).toBe("6.20");
        expect(result.totalDiscount).toBe("2.62"); // 1.00 (20% off on Cheese) + 1.62 (10% off total bill and $1 off)
        expect(result.tax).toBe("0.18"); // Rounded tax
        expect(result.total).toBe("3.76");
    });

    it('should apply all item-level promotions correctly', () => {
        const billDetails = [
            {
                item: "Juice",
                quantity: 4,
                price: 2.50,
                promotions: [
                    { type: "buy_one_get_one_free" },
                    { type: "percentage_discount", discount: 5, minQuantity: 3 }
                ]
            },
            {
                item: "Biscuits",
                quantity: 5,
                price: 1.00,
                promotions: [
                    { type: "percentage_discount", discount: 10, minQuantity: 4 }
                ]
            }
        ];
        const totalBillPromotions = [];
        const taxRate = 5;

        const result = calculateShoppingCart(billDetails, totalBillPromotions, taxRate);

        expect(result.subtotal).toBe("15.00");
        expect(result.totalDiscount).toBe("5.50");
        expect(result.tax).toBe("0.48");
        expect(result.total).toBe("9.98");
    });

    it('should not apply promotions if conditions are not met', () => {
        const billDetails = [
            {
                item: "Coffee",
                quantity: 1,
                price: 10.00,
                promotions: [
                    { type: "percentage_discount", discount: 20, minQuantity: 2 }
                ]
            },
            {
                item: "Sugar",
                quantity: 1,
                price: 3.00,
                promotions: []
            }
        ];
        const totalBillPromotions = [];
        const taxRate = 5;

        const result = calculateShoppingCart(billDetails, totalBillPromotions, taxRate);

        expect(result.subtotal).toBe("13.00");
        expect(result.totalDiscount).toBe("0.00"); // No discounts should be applied
        expect(result.tax).toBe("0.65");
        expect(result.total).toBe("13.65");
    });
});