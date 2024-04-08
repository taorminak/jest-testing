class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(item) {
      this.items.push(item);
    }
  
    removeItem(item) {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  
    getTotal() {
      return this.items.reduce((total, item) => total + item.price, 0);
    }
  
    applyDiscount() {
      const total = this.getTotal();
      let discountPercentage = 0;
  
      if (total > 100) {
        discountPercentage = 10;
      } else if (total > 50) {
        discountPercentage = 5;
      }
  
      if (this.items.length >= 5) {
        discountPercentage += 5;
      }
  
      discountPercentage = Math.min(discountPercentage, 20);
  
      const discount = (discountPercentage / 100) * total;
      return total - discount;
    }
}

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
  
module.exports = { ShoppingCart, Item };
