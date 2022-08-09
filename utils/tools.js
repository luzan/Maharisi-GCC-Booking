module.exports = {
    applyDiscount: (totalPrice, discountType, discountValue) => {
        if (discountType === 'percentage') {
            return totalPrice - (totalPrice * discountValue / 100);
        } else if (discountType === 'fixed') {
            return totalPrice - discountValue;
        } else {
            return totalPrice;
        }
    }
}