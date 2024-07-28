// index.js
function calculateShoppingCart(billDetails, totalBillPromotions, taxRate) {
    let subtotal = 0;
    let totalDiscount = 0;

    // Process item-specific promotions within the item structure
    billDetails.forEach(item => {
        let itemCost = item.price * item.quantity;
        let maxDiscount = 0;

        item.promotions.forEach(promo => {
            let discount = 0;

            if (promo.type === 'buy_one_get_one_free') {
                let pairs = Math.floor(item.quantity / 2);
                discount = pairs * item.price;
            } else if (promo.type === 'percentage_discount' && item.quantity > (promo.minQuantity || 0)) {
                discount = itemCost * (promo.discount / 100);
            }

            // Keep track of the maximum discount for this item
            if (discount > maxDiscount) {
                maxDiscount = discount;
            }
        });

        subtotal += itemCost;
        totalDiscount += maxDiscount;
    });

    // Apply total bill promotions (only `percentage_discount` and `flat_discount`)
    totalBillPromotions.forEach(promo => {
        if (promo.type === 'percentage_discount' && subtotal > promo.minAmount) {
            totalDiscount += subtotal * (promo.discount / 100);
        } else if (promo.type === 'flat_discount' && subtotal > promo.minAmount) {
            totalDiscount += promo.discount;
        }
    });

    let taxableAmount = subtotal - totalDiscount;
    let tax = parseFloat((taxableAmount * (taxRate / 100)).toFixed(2)); // Ensure tax is rounded to two decimal places
    let total = parseFloat((taxableAmount + tax).toFixed(2)); // Ensure total is rounded to two decimal places

    return {
        subtotal: subtotal.toFixed(2),
        totalDiscount: totalDiscount.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
}

module.exports = calculateShoppingCart;
